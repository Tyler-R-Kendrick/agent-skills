---
title: "Use splatting for long parameter lists."
impact: MEDIUM
impactDescription: "general best practice"
tags: powershell-core, tools, powershell-7, pwsh
---

## Use splatting for long parameter lists.

Instead of one-liners with many parameters, build a `$params` hashtable and call with `@params` for readability.
