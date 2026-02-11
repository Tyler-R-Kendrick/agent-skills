---
title: "Use `Either<L, R>` for operations that can fail with..."
impact: MEDIUM
impactDescription: "general best practice"
tags: language-ext, dotnet, functional, optiont-for-null-elimination, eitherl, r-for-typed-error-handling
---

## Use `Either<L, R>` for operations that can fail with...

Use `Either<L, R>` for operations that can fail with domain-specific errors; define error types as discriminated unions (sealed record hierarchies) for exhaustive matching.
