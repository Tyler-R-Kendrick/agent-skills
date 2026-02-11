---
title: "Prefer LINQ query syntax (`from"
impact: LOW
impactDescription: "recommended but situational"
tags: language-ext, dotnet, functional, optiont-for-null-elimination, eitherl, r-for-typed-error-handling
---

## Prefer LINQ query syntax (`from

Prefer LINQ query syntax (`from ... in ... select`) for chaining more than two monadic operations; it reads like sequential code while maintaining functional composition.
