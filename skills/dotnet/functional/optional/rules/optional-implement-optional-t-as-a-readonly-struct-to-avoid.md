---
title: "Implement `Optional<T>` as a `readonly struct` to avoid..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: optional, dotnet, functional, optionalt-type-implementation, null-elimination-patterns, monadic-optional-chaining
---

## Implement `Optional<T>` as a `readonly struct` to avoid...

Implement `Optional<T>` as a `readonly struct` to avoid heap allocations and make the None case zero-cost.
