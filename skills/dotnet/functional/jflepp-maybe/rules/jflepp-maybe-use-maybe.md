---
title: "Use `Maybe"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: jflepp-maybe, dotnet, functional, optional-value-handling-with-maybet, null-elimination, monadic-chaining-of-optional-values
---

## Use `Maybe

Use `Maybe.Some(value)` for present values and `Maybe.None<T>()` for absent values; never pass null where a `Maybe<T>` is expected.
