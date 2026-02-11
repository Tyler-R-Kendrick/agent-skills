---
title: "Leverage the pipeline instead of `foreach` loops."
impact: MEDIUM
impactDescription: "general best practice"
tags: powershell-core, tools, powershell-7, pwsh
---

## Leverage the pipeline instead of `foreach` loops.

PowerShell's pipeline streams objects and uses less memory than collecting everything into an array first.
