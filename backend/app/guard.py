"""Abuse protection for the public assistant.

The assistant runs on a single home GPU exposed through a public landing page,
so the goal is to make it cheap to use honestly and expensive to abuse. State is
in-process, which is correct for a single container; move to Redis if this ever
runs with more than one replica.
"""

from __future__ import annotations

import asyncio
import time
from collections import defaultdict, deque

from fastapi import Request

from .config import settings


class RateLimited(Exception):
    def __init__(self, retry_after: int) -> None:
        self.retry_after = retry_after
        super().__init__(f"rate limited, retry in {retry_after}s")


class Busy(Exception):
    """All generation slots are taken, or this IP already has one open."""


def client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    real = request.headers.get("x-real-ip")
    if real:
        return real.strip()
    return request.client.host if request.client else "unknown"


LOOPBACK_HOSTS = ("localhost", "127.0.0.1", "[::1]", "0.0.0.0")


def is_loopback_origin(origin: str) -> bool:
    """True for any http(s)://localhost:<port> style origin.

    In local development there is no nginx in front, and the dev server port
    changes (5173, 4173, whatever Vite picks when one is taken), so matching the
    host rather than the exact origin string keeps local work friction-free.
    """
    host = origin.split("://", 1)[-1].split("/", 1)[0]
    host = host.rsplit(":", 1)[0] if host.count(":") == 1 else host
    return host in LOOPBACK_HOSTS


def origin_allowed(request: Request) -> bool:
    """Reject requests that did not come from the landing page.

    This is not a security boundary (anyone can forge a header) but it filters
    out drive-by scripts that would otherwise treat the endpoint as a free API.
    """
    if settings.dev_mode:
        return True

    origin = request.headers.get("origin")
    if origin is None:
        # curl and same-origin form posts send no Origin at all.
        referer = request.headers.get("referer", "")
        if not referer:
            return False
        return is_loopback_origin(referer) or any(
            referer.startswith(o) for o in settings.origins
        )

    return origin in settings.origins or is_loopback_origin(origin)


class SlidingWindowLimiter:
    """Per-key sliding window with a short burst limit and a daily cap."""

    def __init__(self, burst: int, window: int, daily: int) -> None:
        self.burst = burst
        self.window = window
        self.daily = daily
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = asyncio.Lock()

    async def check(self, key: str) -> None:
        now = time.time()
        async with self._lock:
            hits = self._hits[key]
            while hits and now - hits[0] > 86400:
                hits.popleft()

            if self.daily and len(hits) >= self.daily:
                raise RateLimited(int(86400 - (now - hits[0])))

            recent = sum(1 for t in hits if now - t <= self.window)
            if recent >= self.burst:
                oldest_recent = next(t for t in hits if now - t <= self.window)
                raise RateLimited(max(1, int(self.window - (now - oldest_recent))))

            hits.append(now)

            # Opportunistic cleanup so idle keys do not accumulate forever.
            if len(self._hits) > 5000:
                for k in [k for k, v in self._hits.items() if not v]:
                    del self._hits[k]

    async def remaining(self, key: str) -> int:
        now = time.time()
        async with self._lock:
            hits = self._hits.get(key)
            if not hits:
                return self.burst
            recent = sum(1 for t in hits if now - t <= self.window)
            return max(0, self.burst - recent)


chat_limiter = SlidingWindowLimiter(
    burst=settings.rate_limit_burst,
    window=settings.rate_limit_window,
    daily=settings.rate_limit_daily,
)

lead_limiter = SlidingWindowLimiter(
    burst=settings.lead_limit_hourly, window=3600, daily=10
)


class ConcurrencyGuard:
    """One generation per IP, and a hard ceiling across all visitors.

    The ceiling matters more than the rate limit: the GPU can physically only
    serve a couple of streams at once, and queueing them just makes everyone
    wait instead of telling one visitor to retry.
    """

    def __init__(self, max_concurrent: int) -> None:
        self._sem = asyncio.Semaphore(max_concurrent)
        self._active_ips: set[str] = set()
        self._lock = asyncio.Lock()

    def slots_free(self) -> bool:
        return not self._sem.locked()

    async def acquire(self, ip: str) -> None:
        async with self._lock:
            if ip in self._active_ips:
                raise Busy("this visitor already has a stream open")
            self._active_ips.add(ip)
        try:
            await asyncio.wait_for(self._sem.acquire(), timeout=0.1)
        except asyncio.TimeoutError:
            async with self._lock:
                self._active_ips.discard(ip)
            raise Busy("no generation slots available") from None

    async def release(self, ip: str) -> None:
        async with self._lock:
            self._active_ips.discard(ip)
        self._sem.release()


concurrency = ConcurrencyGuard(settings.max_concurrent)


def sanitize_messages(raw: list[dict]) -> list[dict]:
    """Trim and validate visitor turns before they reach the model.

    Only user/assistant roles survive: the system prompt is always supplied by
    the backend, so a client cannot redefine the assistant by sending its own.
    """
    cleaned: list[dict] = []
    for item in raw:
        role = str(item.get("role", "")).lower()
        if role not in ("user", "assistant"):
            continue
        content = str(item.get("content", "")).strip()
        if not content:
            continue
        cleaned.append({"role": role, "content": content[: settings.max_message_chars]})

    # Keep the tail of the conversation: two messages per turn.
    limit = settings.max_history_turns * 2
    cleaned = cleaned[-limit:]

    # The model should always be completing a user turn.
    while cleaned and cleaned[0]["role"] == "assistant":
        cleaned.pop(0)
    return cleaned
