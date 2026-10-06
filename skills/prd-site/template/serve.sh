#!/usr/bin/env bash
# Preview the site locally. Usage: bash serve.sh [port]
cd "$(dirname "$0")"
PORT="${1:-8000}"
echo "Serving the PRD & Architecture site at http://localhost:$PORT"
echo "(Press Ctrl+C to stop.)"
python3 -m http.server "$PORT" 2>/dev/null || python -m http.server "$PORT"
