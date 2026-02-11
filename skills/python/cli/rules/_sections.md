# Python CLI Development Rules

Best practices and rules for Python CLI Development.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Write `--help` for everything | MEDIUM | [`cli-write-help-for-everything.md`](cli-write-help-for-everything.md) |
| 2 | Support `--json` output | MEDIUM | [`cli-support-json-output.md`](cli-support-json-output.md) |
| 3 | Write to stderr for diagnostics | MEDIUM | [`cli-write-to-stderr-for-diagnostics.md`](cli-write-to-stderr-for-diagnostics.md) |
| 4 | Use exit codes consistently | MEDIUM | [`cli-use-exit-codes-consistently.md`](cli-use-exit-codes-consistently.md) |
| 5 | Respect `NO_COLOR` | MEDIUM | [`cli-respect-no-color.md`](cli-respect-no-color.md) |
| 6 | Test with CliRunner | MEDIUM | [`cli-test-with-clirunner.md`](cli-test-with-clirunner.md) |
| 7 | Add shell completion | MEDIUM | [`cli-add-shell-completion.md`](cli-add-shell-completion.md) |
| 8 | Use `Annotated` parameters in Typer | MEDIUM | [`cli-use-annotated-parameters-in-typer.md`](cli-use-annotated-parameters-in-typer.md) |
| 9 | Provide `--verbose` and `--quiet` flags | LOW | [`cli-provide-verbose-and-quiet-flags.md`](cli-provide-verbose-and-quiet-flags.md) |
| 10 | Version flag | CRITICAL | [`cli-version-flag.md`](cli-version-flag.md) |
