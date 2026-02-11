---
title: "Avoid mixing null-returning APIs with language-ext types in..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: language-ext, dotnet, functional, optiont-for-null-elimination, eitherl, r-for-typed-error-handling
---

## Avoid mixing null-returning APIs with language-ext types in...

Avoid mixing null-returning APIs with language-ext types in the same layer; establish a boundary where nullables are converted to `Option<T>`.
