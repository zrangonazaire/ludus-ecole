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
for TEST_MODE in git build health success; do
  export TEST_MODE
  : > "$TEST_CALLS"
  options=(--skip-git-pull)
  if [[ "$TEST_MODE" == git ]]; then options=(); fi
  result=0
  bash "$fixture/scripts/redeploy.sh" "${options[@]}" > "$fixture/$TEST_MODE.log" 2>&1 || result=$?
  case "$TEST_MODE" in
    git) [[ "$result" == 43 ]]; ! grep -q 'sudo ' "$TEST_CALLS" ;;
    build) [[ "$result" == 19 ]]; ! grep -q ' up ' "$TEST_CALLS" ;;
    health) [[ "$result" == 22 ]]; ! grep -q '4200' "$TEST_CALLS" ;;
    success) [[ "$result" == 0 ]]; grep -q 'succ' "$fixture/$TEST_MODE.log" ;;
  esac
  if [[ "$TEST_MODE" != git ]]; then ! grep -q '^git ' "$TEST_CALLS"; fi
  if [[ "$TEST_MODE" != success ]]; then ! grep -q 'succ' "$fixture/$TEST_MODE.log"; fi
  echo "PASS: $TEST_MODE (mocked commands, no network or containers)"
done
