#!/usr/bin/env bash
# Run inside an isolated Linux container as root; no Docker socket required.
set -euo pipefail
cd /opt/eduops
mkdir -p config docker/postgres docker/redis /tmp/mock-bin
touch config/application-prod.yml docker/postgres/production.password docker/redis/production.conf
cat > /tmp/mock-bin/docker <<'MOCK'
#!/usr/bin/env bash
if [[ "${TEST_ID_MODE:-}" == failure ]]; then exit 17; fi
if [[ "${TEST_ID_MODE:-}" == invalid ]]; then echo invalid; exit 0; fi
case "$*" in
  *'--entrypoint id backend -u') id -u nobody ;;
  *'--entrypoint id redis -g redis') echo 999 ;;
  *) exit 20 ;;
esac
MOCK
chmod +x /tmp/mock-bin/docker
export PATH="/tmp/mock-bin:$PATH"

# Reproduce sync's old chown: a mode-600 config owned by the SSH user.
chown 1000 config/application-prod.yml
chmod 600 config/application-prod.yml
if su -s /bin/sh nobody -c 'test -r /opt/eduops/config/application-prod.yml'; then
  echo 'Fixture must reproduce unreadable backend config' >&2; exit 1
fi
bash scripts/prepare-prod-permissions.sh
su -s /bin/sh nobody -c 'test -r /opt/eduops/config/application-prod.yml'
[[ "$(stat -c %a config/application-prod.yml)" == 600 ]]
[[ "$(stat -c %u:%g:%a docker/postgres/production.password)" == 0:0:600 ]]
[[ "$(stat -c %u:%g:%a docker/redis/production.conf)" == 0:999:640 ]]
echo 'PASS: real Linux ownership/modes restore non-root backend access'

for TEST_ID_MODE in failure invalid; do
  export TEST_ID_MODE
  chown 1000 config/application-prod.yml
  result=0
  bash scripts/prepare-prod-permissions.sh >/dev/null 2>&1 || result=$?
  [[ "$result" != 0 && "$(stat -c %u config/application-prod.yml)" == 1000 ]]
  echo "PASS: $TEST_ID_MODE identity aborts before changing owners"
done
unset TEST_ID_MODE
mv docker/redis/production.conf docker/redis/production.conf.saved
result=0
bash scripts/prepare-prod-permissions.sh >/dev/null 2>&1 || result=$?
[[ "$result" != 0 ]]
echo 'PASS: missing secret aborts deployment'
