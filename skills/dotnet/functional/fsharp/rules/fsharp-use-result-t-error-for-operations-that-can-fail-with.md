---
title: "Use `Result<'T, 'Error>` for operations that can fail with..."
impact: MEDIUM
impactDescription: "general best practice"
tags: fsharp, dotnet, functional, functional-first-net-programming, discriminated-unions-and-pattern-matching, computation-expressions
---

## Use `Result<'T, 'Error>` for operations that can fail with...

Use `Result<'T, 'Error>` for operations that can fail with domain-specific errors instead of throwing exceptions; chain with `Result.bind` or a computation expression.
