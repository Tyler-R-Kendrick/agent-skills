---
title: "Use `Option<T>` instead of nullable returns for all methods..."
impact: MEDIUM
impactDescription: "general best practice"
tags: language-ext, dotnet, functional, optiont-for-null-elimination, eitherl, r-for-typed-error-handling
---

## Use `Option<T>` instead of nullable returns for all methods...

Use `Option<T>` instead of nullable returns for all methods that may not produce a value; convert at system boundaries using `Optional()` for nullable-to-Option bridging.
