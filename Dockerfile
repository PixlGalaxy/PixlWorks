# PixlWorks Web App.

# ---- 1. Build the landing page ------------------------------------------
FROM node:20-alpine AS frontend

WORKDIR /build
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---- 2. Resolve the Python dependencies ---------------------------------
FROM python:3.12-slim AS backend

WORKDIR /build
COPY backend/requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ---- 3. Runtime ----------------------------------------------------------
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    LEADS_FILE=/app/data/leads.jsonl

RUN apt-get update \
    && apt-get install -y --no-install-recommends nginx curl \
    && rm -rf /var/lib/apt/lists/* \
    && rm -f /etc/nginx/sites-enabled/default \
    && sed -i 's|^\s*error_log .*;|error_log /dev/stderr warn;|' /etc/nginx/nginx.conf \
    && sed -i 's|^\s*access_log .*;|access_log /dev/stdout;|' /etc/nginx/nginx.conf

COPY --from=backend /install /usr/local
COPY --from=frontend /build/dist /usr/share/nginx/html
COPY backend/app /app/app
COPY nginx.conf /etc/nginx/conf.d/pixlworks.conf
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

WORKDIR /app
RUN mkdir -p /app/data && chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -fsS http://127.0.0.1/backend/api/health || exit 1

CMD ["/usr/local/bin/docker-entrypoint.sh"]
