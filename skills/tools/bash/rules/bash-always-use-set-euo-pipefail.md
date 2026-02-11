---
title: "Always use `set -euo pipefail`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: bash, tools, zsh, shell-scripting
---

## Always use `set -euo pipefail`

Exit on errors (`-e`), treat undefined variables as errors (`-u`), and fail on any command in a pipeline (`-o pipefail`).
