#!/usr/bin/env bash
# Run with the same Docker permissions as compose-prod.sh.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
compose() { bash scripts/compose-prod.sh "$@"; }
umask 077
mkdir -p backups
destination="backups/$(date -u +%Y%m%dT%H%M%SZ)"
mkdir "$destination"
# Offline backup keeps database and uploaded files consistent.
# Always attempt to restart the application, including on backup failure.
trap 'compose start backend' EXIT
compose stop backend
compose exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > "$destination/database.dump"
compose run --rm -T --no-deps --entrypoint tar backend -C /app/storage -czf - . > "$destination/storage.tar.gz"
test -s "$destination/database.dump"
gzip -t "$destination/storage.tar.gz"
cp .env.prod "$destination/environment.env"
git rev-parse HEAD > "$destination/revision.txt"
touch "$destination/COMPLETE"
echo "Backup complete: $destination (contains secrets; copy securely off the VPS)."
