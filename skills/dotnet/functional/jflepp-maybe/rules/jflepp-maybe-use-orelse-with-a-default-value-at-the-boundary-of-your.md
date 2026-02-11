---
title: "Use `OrElse` with a default value at the boundary of your..."
impact: MEDIUM
impactDescription: "general best practice"
tags: jflepp-maybe, dotnet, functional, optional-value-handling-with-maybet, null-elimination, monadic-chaining-of-optional-values
---

## Use `OrElse` with a default value at the boundary of your...

Use `OrElse` with a default value at the boundary of your application (e.g., in API endpoints or UI code) to convert from `Maybe<T>` to a concrete value.
