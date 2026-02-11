# Bash & Shell Scripting Rules

Best practices and rules for Bash & Shell Scripting.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always use `set -euo pipefail` | CRITICAL | [`bash-always-use-set-euo-pipefail.md`](bash-always-use-set-euo-pipefail.md) |
| 2 | Quote your variables | CRITICAL | [`bash-quote-your-variables.md`](bash-quote-your-variables.md) |
| 3 | Use ShellCheck | CRITICAL | [`bash-use-shellcheck.md`](bash-use-shellcheck.md) |
| 4 | Prefer `[[ ]]` over `[ ]` | LOW | [`bash-prefer-over.md`](bash-prefer-over.md) |
| 5 | Use functions for reusability | HIGH | [`bash-use-functions-for-reusability.md`](bash-use-functions-for-reusability.md) |
| 6 | Add `#!/usr/bin/env bash` shebang | MEDIUM | [`bash-add-usr-bin-env-bash-shebang.md`](bash-add-usr-bin-env-bash-shebang.md) |
| 7 | Trap for cleanup | HIGH | [`bash-trap-for-cleanup.md`](bash-trap-for-cleanup.md) |
| 8 | Avoid parsing `ls` output | HIGH | [`bash-avoid-parsing-ls-output.md`](bash-avoid-parsing-ls-output.md) |
