#!/usr/bin/env bash
set -euo pipefail

# Validate SKILL.md files using this repository's frontmatter contract.
# Usage:
#   bash scripts/validate.sh                # validate all skills
#   bash scripts/validate.sh skills/dotnet/aspnet-core  # validate one skill

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
python "$SCRIPT_DIR/validate-skills.py" "$@"
