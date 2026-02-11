---
title: "Use `pwsh` not `powershell`."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: powershell-core, tools, powershell-7, pwsh
---

## Use `pwsh` not `powershell`.

The `pwsh` command launches PowerShell 7+, while `powershell` launches the legacy 5.1 on Windows. Always be explicit about which version you target.
