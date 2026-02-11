---
title: "Avoid calling `"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: jflepp-maybe, dotnet, functional, optional-value-handling-with-maybet, null-elimination, monadic-chaining-of-optional-values
---

## Avoid calling `

Avoid calling `.Value` directly without checking `.HasValue` first; prefer `Match`, `Select`, or `OrElse` for safe access.
