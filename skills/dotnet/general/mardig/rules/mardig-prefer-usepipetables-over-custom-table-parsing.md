---
title: "Prefer `UsePipeTables()` over custom table parsing"
impact: LOW
impactDescription: "recommended but situational"
tags: mardig, dotnet, general, converting-markdown-to-html, building-custom-markdown-pipelines, parsing-markdown-ast
---

## Prefer `UsePipeTables()` over custom table parsing

Prefer `UsePipeTables()` over custom table parsing: because Markdig's built-in table extension handles edge cases like alignment, escaping, and multi-line cells correctly.
