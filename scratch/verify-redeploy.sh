#!/usr/bin/env bash
set -euo pipefail
root="$PWD"
fixture=$(mktemp -d "$root/scratch/redeploy-test.XXXXXX")
mkdir -p "$fixture/scripts" "$fixture/.git" "$fixture/bin"
cp scripts/redeploy.sh "$fixture/scripts/redeploy.sh"
cat > "$fixture/bin/git" <<'MOCK'
#!/usr/bin/env bash
echo "git $*" >> "$TEST_CALLS"
exit 43
MOCK
cat > "$fixture/bin/sudo" <<'MOCK'
#!/usr/bin/env bash
echo "sudo $*" >> "$TEST_CALLS"
if [[ "$*" == *' build '* && "$TEST_MODE" == build ]]; then exit 19; fi
if [[ "$*" == *'prepare-prod-permissions.sh'* && "$TEST_MODE" == permissions ]]; then exit 31; fi
if [[ "$*" == *' up '* && "$TEST_MODE" == up ]]; then exit 27; fi
if [[ "$*" == *'ps -a -q backend'* ]]; then echo fake-backend; fi
exit 0
MOCK
cat > "$fixture/bin/curl" <<'MOCK'
#!/usr/bin/env bash
echo "curl $*" >> "$TEST_CALLS"
if [[ "$TEST_MODE" == health ]]; then exit 22; fi
exit 0
MOCK
chmod +x "$fixture/bin/"*
export PATH="$fixture/bin:$PATH"
export TEST_CALLS="$fixture/calls.log"
for TEST_MODE in git build permissions up health success; do
  export TEST_MODE
  : > "$TEST_CALLS"
  options=(--skip-git-pull)
  if [[ "$TEST_MODE" == git ]]; then options=(); fi
  result=0
  bash "$fixture/scripts/redeploy.sh" "${options[@]}" > "$fixture/$TEST_MODE.log" 2>&1 || result=$?
  case "$TEST_MODE" in
    git) [[ "$result" == 43 ]]; ! grep -q ' build ' "$TEST_CALLS" ;;
    build) [[ "$result" == 19 ]]; ! grep -q ' up ' "$TEST_CALLS" ;;
    permissions) [[ "$result" == 31 ]]; ! grep -q ' up ' "$TEST_CALLS" ;;
    up) [[ "$result" == 27 ]]; grep -q 'logs --no-color' "$TEST_CALLS"; grep -q 'docker inspect' "$TEST_CALLS"; ! grep -q '^curl ' "$TEST_CALLS" ;;
    health) [[ "$result" == 22 ]]; ! grep -q '4200' "$TEST_CALLS" ;;
    success) [[ "$result" == 0 ]]; grep -q 'succ' "$fixture/$TEST_MODE.log"
      permission_line=$(grep -n 'prepare-prod-permissions.sh' "$TEST_CALLS" | cut -d: -f1)
      up_line=$(grep -n ' up ' "$TEST_CALLS" | head -n1 | cut -d: -f1)
      [[ "$permission_line" -lt "$up_line" ]]
      grep -q 'up -d --no-deps --force-recreate --wait --wait-timeout 300 backend frontend' "$TEST_CALLS" ;;
  esac
  if [[ "$TEST_MODE" != git ]]; then ! grep -q '^git ' "$TEST_CALLS"; fi
  if [[ "$TEST_MODE" != success ]]; then ! grep -q 'succ' "$fixture/$TEST_MODE.log"; fi
  echo "PASS: $TEST_MODE (mocked commands, no network or containers)"
done
