"""Lead capture for the contact form.

Appends to a JSONL file rather than using a database: the landing produces a
handful of leads a day, the file is trivial to mount as a volume, and it can be
imported into anything later.
"""

from __future__ import annotations

import json
import logging
import re
from datetime import datetime, timezone
from pathlib import Path

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field

from ..config import settings
from ..guard import RateLimited, client_ip, lead_limiter, origin_allowed

log = logging.getLogger("pixlworks.lead")
router = APIRouter(prefix="/api", tags=["lead"])

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$")


class Lead(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: str = Field(min_length=3, max_length=200)
    business: str = Field(default="", max_length=160)
    message: str = Field(default="", max_length=1500)
    lang: str = Field(default="es", max_length=5)


@router.post("/lead")
async def create_lead(request: Request, lead: Lead) -> dict:
    if not origin_allowed(request):
        raise HTTPException(status_code=403, detail={"state": "forbidden"})

    if not EMAIL_RE.match(lead.email.strip()):
        raise HTTPException(status_code=422, detail={"state": "invalid_email"})

    ip = client_ip(request)
    try:
        await lead_limiter.check(ip)
    except RateLimited as exc:
        raise HTTPException(
            status_code=429,
            detail={"state": "rate_limited", "retry_after": exc.retry_after},
            headers={"Retry-After": str(exc.retry_after)},
        ) from exc

    record = {
        "at": datetime.now(timezone.utc).isoformat(),
        "ip": ip,
        "name": lead.name.strip(),
        "email": lead.email.strip(),
        "business": lead.business.strip(),
        "message": lead.message.strip(),
        "lang": lead.lang,
    }

    path = Path(settings.leads_file)
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("a", encoding="utf-8") as fh:
            fh.write(json.dumps(record, ensure_ascii=False) + "\n")
    except OSError:
        # Never lose the lead to a disk problem: the log is the fallback.
        log.exception("could not persist lead, recording it here: %s", record)
        raise HTTPException(status_code=500, detail={"state": "error"}) from None

    log.info("lead captured from %s (%s)", record["email"], ip)
    return {"state": "ok"}
