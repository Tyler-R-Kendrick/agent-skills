---
title: "Prefer `-ErrorAction Stop` in scripts."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: powershell-core, tools, powershell-7, pwsh
---

## Prefer `-ErrorAction Stop` in scripts.

Non-terminating errors are silent by default. Using `-ErrorAction Stop` or setting `$ErrorActionPreference = "Stop"` ensures errors are caught by `try`/`catch`.
