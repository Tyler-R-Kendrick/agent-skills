---
title: "Avoid aliases in scripts."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: powershell-core, tools, powershell-7, pwsh
---

## Avoid aliases in scripts.

Aliases like `%`, `?`, `gci`, and `sls` are convenient interactively but make scripts hard to read. Use full cmdlet names in committed code.
