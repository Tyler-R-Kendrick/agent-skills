# TypeScript CLI Development Rules

Best practices and rules for TypeScript CLI Development.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always provide `--help` and `--version` flags. | CRITICAL | [`cli-always-provide-help-and-version-flags.md`](cli-always-provide-help-and-version-flags.md) |
| 2 | Use exit codes correctly. | CRITICAL | [`cli-use-exit-codes-correctly.md`](cli-use-exit-codes-correctly.md) |
| 3 | Support `--json` output | MEDIUM | [`cli-support-json-output.md`](cli-support-json-output.md) |
| 4 | Handle SIGINT gracefully. | MEDIUM | [`cli-handle-sigint-gracefully.md`](cli-handle-sigint-gracefully.md) |
| 5 | Use stderr for errors and diagnostics, stdout for data. | MEDIUM | [`cli-use-stderr-for-errors-and-diagnostics-stdout-for-data.md`](cli-use-stderr-for-errors-and-diagnostics-stdout-for-data.md) |
| 6 | Respect `NO_COLOR` environment variable. | MEDIUM | [`cli-respect-no-color-environment-variable.md`](cli-respect-no-color-environment-variable.md) |
| 7 | Validate input early. | HIGH | [`cli-validate-input-early.md`](cli-validate-input-early.md) |
| 8 | Provide shell completion. | MEDIUM | [`cli-provide-shell-completion.md`](cli-provide-shell-completion.md) |
| 9 | Test your CLI as a black box. | MEDIUM | [`cli-test-your-cli-as-a-black-box.md`](cli-test-your-cli-as-a-black-box.md) |
| 10 | Use `commander` for simple CLIs, `yargs` for complex option parsing, and `oclif` for large extensible tools. | MEDIUM | [`cli-use-commander-for-simple-clis-yargs-for-complex-option.md`](cli-use-commander-for-simple-clis-yargs-for-complex-option.md) |
