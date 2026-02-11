# PowerShell Core Rules

Best practices and rules for PowerShell Core.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `pwsh` not `powershell`. | CRITICAL | [`powershell-core-use-pwsh-not-powershell.md`](powershell-core-use-pwsh-not-powershell.md) |
| 2 | Use approved verbs for function names. | MEDIUM | [`powershell-core-use-approved-verbs-for-function-names.md`](powershell-core-use-approved-verbs-for-function-names.md) |
| 3 | Prefer `-ErrorAction Stop` in scripts. | HIGH | [`powershell-core-prefer-erroraction-stop-in-scripts.md`](powershell-core-prefer-erroraction-stop-in-scripts.md) |
| 4 | Use `[CmdletBinding()]` on all functions. | MEDIUM | [`powershell-core-use-cmdletbinding-on-all-functions.md`](powershell-core-use-cmdletbinding-on-all-functions.md) |
| 5 | Avoid aliases in scripts. | HIGH | [`powershell-core-avoid-aliases-in-scripts.md`](powershell-core-avoid-aliases-in-scripts.md) |
| 6 | Use splatting for long parameter lists. | MEDIUM | [`powershell-core-use-splatting-for-long-parameter-lists.md`](powershell-core-use-splatting-for-long-parameter-lists.md) |
| 7 | Leverage the pipeline instead of `foreach` loops. | MEDIUM | [`powershell-core-leverage-the-pipeline-instead-of-foreach-loops.md`](powershell-core-leverage-the-pipeline-instead-of-foreach-loops.md) |
| 8 | Test with Pester. | MEDIUM | [`powershell-core-test-with-pester.md`](powershell-core-test-with-pester.md) |
