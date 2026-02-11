---
title: "Avoid calling `"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: optional, dotnet, functional, optionalt-type-implementation, null-elimination-patterns, monadic-optional-chaining
---

## Avoid calling `

Avoid calling `.Value` or similar unsafe accessors; always use `Match`, `Map`, or `OrElse` for safe access.
