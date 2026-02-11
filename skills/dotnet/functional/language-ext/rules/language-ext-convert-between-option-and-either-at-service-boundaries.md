---
title: "Convert between `Option` and `Either` at service boundaries..."
impact: MEDIUM
impactDescription: "general best practice"
tags: language-ext, dotnet, functional, optiont-for-null-elimination, eitherl, r-for-typed-error-handling
---

## Convert between `Option` and `Either` at service boundaries...

Convert between `Option` and `Either` at service boundaries using `ToEither(errorValue)` when you need to add error context to an absent value.
