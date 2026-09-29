"""Chat endpoints: model status plus the streaming assistant.

The interesting part is the status machine. Ollama keeps the HTTP connection
open while it pulls the model into VRAM, so from the client's point of view a
cold start and a slow answer look identical. We poll /api/ps while waiting for
the first token so the UI can distinguish "loading the model onto the server"
from "the model is thinking".
"""

from __future__ import annotations

import asyncio
import json
import logging
import time
from typing import Any, AsyncIterator

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from ..config import settings
from ..guard import (
    Busy,
    RateLimited,
    chat_limiter,
    client_ip,
    concurrency,
    origin_allowed,
    sanitize_messages,
)
from ..ollama import ModelMissing, OllamaUnreachable, client
from ..prompt import SUGGESTED_QUESTIONS, SYSTEM_PROMPT

log = logging.getLogger("pixlworks.chat")
router = APIRouter(prefix="/api", tags=["chat"])

# How often to re-check whether the model finished loading, in seconds. Doubles
# as the heartbeat and client-disconnect check interval.
POLL_INTERVAL = 1.5

_DONE = object()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message] = Field(default_factory=list)


# -- status ---------------------------------------------------------------

_status_cache: dict[str, Any] = {"value": None, "at": 0.0}
_STATUS_TTL = 5.0


async def _compute_status() -> dict:
    if not concurrency.slots_free():
        return {"state": "busy"}
    try:
        model = await client.resolve_model()
    except ModelMissing:
        return {"state": "model_missing"}
    except OllamaUnreachable:
        return {"state": "offline"}
    try:
        loaded = await client.is_loaded(model)
    except OllamaUnreachable:
        return {"state": "offline"}
    return {"state": "ready" if loaded else "not_loaded"}


@router.get("/chat/status")
async def chat_status() -> dict:
    now = time.monotonic()
    if _status_cache["value"] and now - _status_cache["at"] < _STATUS_TTL:
        return _status_cache["value"]
    value = await _compute_status()
    _status_cache.update(value=value, at=now)
    return value


@router.get("/chat/suggestions")
async def chat_suggestions(lang: str = "es") -> dict:
    return {"questions": SUGGESTED_QUESTIONS.get(lang, SUGGESTED_QUESTIONS["es"])}


# -- streaming ------------------------------------------------------------


def _sse(event: str, data: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


async def _next_chunk(agen: AsyncIterator[dict]) -> Any:
    """Await one chunk, returning a sentinel instead of raising at the end."""
    try:
        return await agen.__anext__()
    except StopAsyncIteration:
        return _DONE


async def _event_stream(request: Request, messages: list[dict], ip: str):
    started = time.monotonic()
    tokens = 0
    agen: AsyncIterator[dict] | None = None
    pending: asyncio.Task | None = None

    try:
        try:
            model = await client.resolve_model()
        except ModelMissing as exc:
            log.warning("no usable model: %s", exc)
            yield _sse("error", {"state": "model_missing"})
            return
        except OllamaUnreachable as exc:
            log.warning("ollama unreachable: %s", exc)
            yield _sse("error", {"state": "offline"})
            return

        try:
            loaded = await client.is_loaded(model)
        except OllamaUnreachable:
            yield _sse("error", {"state": "offline"})
            return

        # A cold model has to be pulled into VRAM before any token appears, and
        # that is the wait worth narrating.
        if loaded:
            state = "thinking"
            yield _sse("status", {"state": "thinking"})
        else:
            state = "loading"
            yield _sse("status", {"state": "not_loaded"})
            yield _sse("status", {"state": "loading"})

        payload = [{"role": "system", "content": SYSTEM_PROMPT}, *messages]
        agen = client.stream_chat(model, payload).__aiter__()

        while True:
            if pending is None:
                pending = asyncio.create_task(_next_chunk(agen))

            done, _ = await asyncio.wait({pending}, timeout=POLL_INTERVAL)

            if not done:
                if await request.is_disconnected():
                    log.info("client %s disconnected, cancelling generation", ip)
                    return
                # Still no token. If the model just became resident, the cold
                # load is over and it is now actually generating.
                if state == "loading":
                    try:
                        if await client.is_loaded(model):
                            state = "thinking"
                            yield _sse("status", {"state": "thinking"})
                    except OllamaUnreachable:
                        pass
                yield ": ping\n\n"
                continue

            chunk = pending.result()
            pending = None

            if chunk is _DONE:
                break

            if chunk.get("error"):
                log.warning("ollama returned an error: %s", chunk["error"])
                yield _sse("error", {"state": "error"})
                return

            piece = (chunk.get("message") or {}).get("content", "")
            if piece:
                if state != "streaming":
                    state = "streaming"
                    yield _sse("status", {"state": "streaming"})
                tokens += 1
                yield _sse("token", {"t": piece})

            if chunk.get("done"):
                break

        elapsed = int((time.monotonic() - started) * 1000)
        yield _sse("done", {"state": "done", "tokens": tokens, "ms": elapsed})

    except OllamaUnreachable as exc:
        log.warning("stream lost connection to ollama: %s", exc)
        yield _sse("error", {"state": "offline"})
    except asyncio.CancelledError:
        raise
    except Exception:
        log.exception("unexpected failure while streaming")
        yield _sse("error", {"state": "error"})
    finally:
        if pending is not None:
            pending.cancel()
        if agen is not None:
            # Closes the upstream HTTP stream so an abandoned tab stops
            # occupying the GPU.
            await agen.aclose()
        await concurrency.release(ip)


@router.post("/chat")
async def chat(request: Request, body: ChatRequest) -> StreamingResponse:
    if not origin_allowed(request):
        raise HTTPException(status_code=403, detail={"state": "forbidden"})

    messages = sanitize_messages([m.model_dump() for m in body.messages])
    if not messages:
        raise HTTPException(status_code=400, detail={"state": "empty"})

    ip = client_ip(request)

    try:
        await chat_limiter.check(ip)
    except RateLimited as exc:
        raise HTTPException(
            status_code=429,
            detail={"state": "rate_limited", "retry_after": exc.retry_after},
            headers={"Retry-After": str(exc.retry_after)},
        ) from exc

    try:
        await concurrency.acquire(ip)
    except Busy as exc:
        raise HTTPException(status_code=503, detail={"state": "busy"}) from exc

    remaining = await chat_limiter.remaining(ip)
    return StreamingResponse(
        _event_stream(request, messages, ip),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            # Tells nginx not to buffer the stream, which would otherwise
            # deliver every status change at once when the answer finishes.
            "X-Accel-Buffering": "no",
            "X-RateLimit-Remaining": str(remaining),
        },
    )
