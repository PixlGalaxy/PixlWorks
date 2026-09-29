#!/bin/bash
# Runs nginx and uvicorn side by side in one container.
#
# Both streams are tagged so `docker logs` stays readable with two processes
# writing into it:
#
#   [INIT]     starting uvicorn on 127.0.0.1:8000
#   [BACKEND]  INFO:     resolved ollama model: gemma4:e4b
#   [FRONTEND] 172.18.0.1 - GET /backend/api/chat/status 200
#
# There is no supervisor on purpose: if either process dies the container exits,
# and Docker's restart policy brings the whole thing back. A supervisor that
# silently restarts one half would hide the failure instead.
set -euo pipefail

# `sed -u` keeps it line-buffered, otherwise the tags would arrive in bursts
# and SSE debugging would be misleading.
tag_backend() { sed -u 's/^/[BACKEND]  /'; }
tag_frontend() { sed -u 's/^/[FRONTEND] /'; }
say() { echo "[INIT]     $*"; }

term() {
  say "shutting down"
  kill -TERM "${nginx_pid:-}" "${api_pid:-}" 2>/dev/null || true
  wait 2>/dev/null || true
}
trap term TERM INT

say "starting uvicorn on 127.0.0.1:8000"
# Process substitution rather than a pipe, so $! is uvicorn's own PID and the
# trap above can actually signal it.
uvicorn app.main:app --host 127.0.0.1 --port 8000 > >(tag_backend) 2>&1 &
api_pid=$!

say "starting nginx on :80"
# nginx is configured to log to /dev/stdout and /dev/stderr, which here are the
# tagging pipes rather than the container's streams.
nginx -g 'daemon off;' > >(tag_frontend) 2>&1 &
nginx_pid=$!

# Return as soon as either one exits, so a dead backend is not hidden behind a
# still-serving nginx.
wait -n
status=$?
say "a process exited with status ${status}; stopping the container"
term
exit "${status}"
