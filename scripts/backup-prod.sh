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
compose exec -T postgres pg_dump -U eduops -d eduops -Fc > "$destination/database.dump"
compose run --rm -T --no-deps --entrypoint tar backend -C /app/storage -czf - . > "$destination/storage.tar.gz"
test -s "$destination/database.dump"
gzip -t "$destination/storage.tar.gz"
cp docker/postgres/production.password "$destination/postgres.password"
cp docker/redis/production.conf "$destination/redis.conf"
cp /opt/eduops/config/application-prod.yml "$destination/application-prod.yml"
docker compose -f docker/compose.prod.yml config --images > "$destination/images.txt"
touch "$destination/COMPLETE"
echo "Backup complete: $destination (contains secrets; copy securely off the VPS)."
