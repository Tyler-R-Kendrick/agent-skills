---
title: "Use `OrElse` with a default value only at the edges of the..."
impact: MEDIUM
impactDescription: "general best practice"
tags: optional, dotnet, functional, optionalt-type-implementation, null-elimination-patterns, monadic-optional-chaining
---

## Use `OrElse` with a default value only at the edges of the...

Use `OrElse` with a default value only at the edges of the system (API responses, UI rendering); keep Optional propagating through the core logic.
