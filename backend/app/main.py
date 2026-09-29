from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from uvicorn.logging import DefaultFormatter

from .config import settings
from .ollama import client
from .routes import chat, lead

def _configure_logging() -> None:
    """Log in uvicorn's own console style: `INFO:     message`, no timestamps.

    uvicorn has already configured its `uvicorn.*` loggers by the time this
    module is imported, so only the root logger is touched here — which is what
    every `pixlworks.*` logger writes through.
    """
    handler = logging.StreamHandler()
    handler.setFormatter(DefaultFormatter("%(levelprefix)s %(message)s"))

    root = logging.getLogger()
    root.handlers = [handler]
    root.setLevel(settings.log_level.upper())

    # httpx logs a line per request, and the status machine polls /api/ps every
    # 1.5s during a cold load — that would bury our own messages.
    if settings.log_level.upper() != "DEBUG":
        logging.getLogger("httpx").setLevel(logging.WARNING)


_configure_logging()
log = logging.getLogger("pixlworks")


@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("PixlWorks API starting | ollama=%s", settings.ollama_host)
    # Best-effort warm resolve. The GPU box is often unreachable (different
    # network), and that must not stop the API from serving the landing page.
    try:
        model = await client.resolve_model()
        log.info("resolved ollama model: %s", model)
    except Exception as exc:
        log.warning("ollama not reachable at startup (%s); assistant starts offline", exc)
    yield
    await client.aclose()


app = FastAPI(
    title="PixlWorks API",
    description="Assistant and lead capture for pixlworks.itzgalaxy.com",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
    expose_headers=["X-RateLimit-Remaining", "Retry-After"],
)

app.include_router(chat.router)
app.include_router(lead.router)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """Always answer with a body carrying a `state`, so the UI has one shape to read."""
    detail = exc.detail
    body = detail if isinstance(detail, dict) else {"state": "error", "detail": detail}
    return JSONResponse(status_code=exc.status_code, content=body, headers=exc.headers)


@app.get("/api/health")
async def health() -> dict:
    return {"status": "ok"}
