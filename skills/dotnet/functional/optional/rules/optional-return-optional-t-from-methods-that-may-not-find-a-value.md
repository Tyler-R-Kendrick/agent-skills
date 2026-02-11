---
title: "Return `Optional<T>` from methods that may not find a value..."
impact: MEDIUM
impactDescription: "general best practice"
tags: optional, dotnet, functional, optionalt-type-implementation, null-elimination-patterns, monadic-optional-chaining
---

## Return `Optional<T>` from methods that may not find a value...

Return `Optional<T>` from methods that may not find a value (repository lookups, dictionary gets, parsing) to make absence explicit in the return type.
