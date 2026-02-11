---
title: "Use `Match` with explicit handlers for all cases to ensure..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: language-ext, dotnet, functional, optiont-for-null-elimination, eitherl, r-for-typed-error-handling
---

## Use `Match` with explicit handlers for all cases to ensure...

Use `Match` with explicit handlers for all cases to ensure complete handling; avoid `IfSome`/`IfNone` in business logic where both paths need to produce a value.
