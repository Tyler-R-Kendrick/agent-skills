---
title: "Use `Validation<F, S>` when you need to accumulate all..."
impact: MEDIUM
impactDescription: "general best practice"
tags: language-ext, dotnet, functional, optiont-for-null-elimination, eitherl, r-for-typed-error-handling
---

## Use `Validation<F, S>` when you need to accumulate all...

Use `Validation<F, S>` when you need to accumulate all validation errors (e.g., form validation) rather than stopping at the first failure as `Either` does.
