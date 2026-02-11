---
title: "Use `Try<T>` and `TryAsync<T>` at infrastructure boundaries..."
impact: MEDIUM
impactDescription: "general best practice"
tags: language-ext, dotnet, functional, optiont-for-null-elimination, eitherl, r-for-typed-error-handling
---

## Use `Try<T>` and `TryAsync<T>` at infrastructure boundaries...

Use `Try<T>` and `TryAsync<T>` at infrastructure boundaries (file I/O, HTTP calls) to convert exceptions into monadic values that compose safely.
