---
title: "Use `.To<T>()` for configuration parsing"
impact: MEDIUM
impactDescription: "general best practice"
tags: olive, dotnet, general, common-string-extensions-null-safe-operations, validation, collection-utilities
---

## Use `.To<T>()` for configuration parsing

Use `.To<T>()` for configuration parsing: where missing or invalid values should silently default, and `.ToIntOrNull()` when you need to detect and report invalid input.
