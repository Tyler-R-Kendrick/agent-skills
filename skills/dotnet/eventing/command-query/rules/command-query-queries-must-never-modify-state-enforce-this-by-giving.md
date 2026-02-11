---
title: "Queries must never modify state; enforce this by giving..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: command-query, dotnet, eventing, separating-readwrite-models, cqs-pattern-implementation, cqrs-architecture
---

## Queries must never modify state; enforce this by giving...

Queries must never modify state; enforce this by giving query handlers read-only database connections or `AsNoTracking()` EF contexts.
