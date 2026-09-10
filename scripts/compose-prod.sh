#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
if [[ ! -f .env.prod ]]; then
  echo 'Create .env.prod from .env.prod.example and fill in the production values.' >&2
  exit 1
fi
exec docker compose --env-file .env.prod -f docker/compose.prod.yml "$@"
