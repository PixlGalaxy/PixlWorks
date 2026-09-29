"""Thin async client for the Ollama server running on Zaylar.

Everything here is defensive: the GPU box is not always reachable and the model
is not always resident in VRAM, so every call has a bounded timeout and the
callers are expected to handle OllamaUnreachable.
"""

from __future__ import annotations

import json
import logging
import time
from typing import AsyncIterator

import httpx

from .config import settings

log = logging.getLogger("pixlworks.ollama")


class OllamaUnreachable(RuntimeError):
    """The Ollama server did not answer in time."""


class ModelMissing(RuntimeError):
    """Ollama is up but has no usable Gemma model installed."""


class ThinkUnsupported(RuntimeError):
    """The model does not accept the `think` flag; retry without it."""


class OllamaClient:
    def __init__(self) -> None:
        self._client = httpx.AsyncClient(
            base_url=settings.ollama_host.rstrip("/"),
            timeout=httpx.Timeout(settings.ollama_timeout, connect=5.0),
        )
        # Resolved model tag, cached once we confirm what is actually installed.
        self._resolved_model: str | None = None
        self._resolved_at: float = 0.0

    async def aclose(self) -> None:
        await self._client.aclose()

    # -- basic probes ----------------------------------------------------

    async def probe(self) -> bool:
        """Is the Ollama server reachable at all? Fast, never raises."""
        try:
            r = await self._client.get(
                "/api/version", timeout=settings.ollama_probe_timeout
            )
            return r.status_code == 200
        except Exception:
            return False

    async def list_models(self) -> list[str]:
        try:
            r = await self._client.get(
                "/api/tags", timeout=settings.ollama_probe_timeout
            )
            r.raise_for_status()
        except Exception as exc:
            raise OllamaUnreachable(str(exc)) from exc
        return [m.get("name", "") for m in r.json().get("models", [])]

    async def running_models(self) -> list[dict]:
        """Models currently held in memory. Empty list means nothing is loaded."""
        try:
            r = await self._client.get("/api/ps", timeout=settings.ollama_probe_timeout)
            r.raise_for_status()
        except Exception as exc:
            raise OllamaUnreachable(str(exc)) from exc
        return r.json().get("models", [])

    # -- model resolution ------------------------------------------------

    async def resolve_model(self, force: bool = False) -> str:
        """Return the model tag to use, falling back to any installed Gemma.

        The configured tag may not match what is actually pulled on the server,
        so rather than failing we look for the closest Gemma and remember it.
        """
        fresh = time.monotonic() - self._resolved_at < 300
        if self._resolved_model and fresh and not force:
            return self._resolved_model

        installed = await self.list_models()
        if not installed:
            raise ModelMissing("no models installed on the Ollama server")

        target = settings.ollama_model
        chosen: str | None = None

        if target in installed:
            chosen = target
        else:
            # Tolerate a missing ":latest" suffix in either direction.
            base = target.split(":")[0]
            for name in installed:
                if name == target or name.split(":")[0] == base:
                    chosen = name
                    break
        if chosen is None:
            gemmas = [n for n in installed if "gemma" in n.lower()]
            if gemmas:
                chosen = gemmas[0]
                log.warning(
                    "configured model %r not installed; falling back to %r",
                    target,
                    chosen,
                )
        if chosen is None:
            raise ModelMissing(f"no gemma model installed (have: {installed})")

        self._resolved_model = chosen
        self._resolved_at = time.monotonic()
        return chosen

    async def is_loaded(self, model: str) -> bool:
        """True when the model sits in VRAM and will answer without a cold load."""
        base = model.split(":")[0]
        for entry in await self.running_models():
            name = entry.get("name", "")
            if name == model or name.split(":")[0] == base:
                return entry.get("size_vram", 0) > 0 or entry.get("size", 0) > 0
        return False

    # -- generation ------------------------------------------------------

    async def stream_chat(
        self, model: str, messages: list[dict]
    ) -> AsyncIterator[dict]:
        """Yield raw Ollama chat chunks as they arrive.

        Ollama holds the connection open while it loads the model into VRAM, so
        the first chunk can be many seconds away on a cold start.
        """
        payload: dict = {
            "model": model,
            "messages": messages,
            "stream": True,
            "think": settings.ollama_think,
            "options": {
                "num_predict": settings.max_output_tokens,
                "temperature": 0.4,
                "top_p": 0.9,
                "num_ctx": 4096,
            },
        }

        try:
            async for chunk in self._stream_once(payload):
                yield chunk
            return
        except ThinkUnsupported:
            # Models that know nothing about thinking reject the field outright.
            log.warning("model %r rejected the think flag; retrying without it", model)
            payload.pop("think", None)

        async for chunk in self._stream_once(payload):
            yield chunk

    async def _stream_once(self, payload: dict) -> AsyncIterator[dict]:
        try:
            async with self._client.stream(
                "POST", "/api/chat", json=payload
            ) as response:
                if response.status_code != 200:
                    body = (await response.aread()).decode("utf-8", "replace")
                    if "think" in payload and "think" in body.lower():
                        raise ThinkUnsupported(body[:200])
                    raise OllamaUnreachable(f"HTTP {response.status_code}: {body[:200]}")
                async for line in response.aiter_lines():
                    if not line.strip():
                        continue
                    try:
                        yield json.loads(line)
                    except json.JSONDecodeError:
                        log.debug("skipping non-JSON line from ollama: %r", line[:120])
        except httpx.HTTPError as exc:
            raise OllamaUnreachable(str(exc)) from exc


client = OllamaClient()
