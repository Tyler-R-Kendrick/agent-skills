#!/usr/bin/env bash
set -euo pipefail

# Validate SKILL.md files using skills-ref (agentskills CLI).
# Usage:
#   bash scripts/validate.sh                # validate all skills
#   bash scripts/validate.sh skills/dotnet/aspnet-core  # validate one skill

if ! command -v agentskills &>/dev/null; then
  echo "Error: skills-ref is not installed (provides the 'agentskills' CLI)."
  echo "Install it with:  pip install -r requirements.txt"
  exit 1
fi

FAIL=0
PASS=0
ERRORS=()

validate_skill() {
  local dir="$1"
  if agentskills validate "$dir"; then
    ((PASS++))
  else
    ((FAIL++))
    ERRORS+=("$dir")
  fi
}

# Single-skill mode
if [[ $# -ge 1 ]]; then
  validate_skill "$1"
else
  # Find all SKILL.md files under skills/ and .agents/skills/
  while IFS= read -r skillmd; do
    validate_skill "$(dirname "$skillmd")"
  done < <(find skills/ .agents/skills/ -name "SKILL.md" 2>/dev/null)
fi

echo ""
echo "=== Validation Summary ==="
echo "Passed: $PASS"
echo "Failed: $FAIL"

if [[ $FAIL -gt 0 ]]; then
  echo ""
  echo "Failing skills:"
  for e in "${ERRORS[@]}"; do
    echo "  - $e"
  done
  exit 1
fi
