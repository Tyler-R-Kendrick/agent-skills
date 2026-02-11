---
title: "Use `[Transient]` for runtime-only state"
impact: MEDIUM
impactDescription: "general best practice"
tags: migrant, dotnet, serialization, fast-binary-serialization-of-complex-object-graphs, version-tolerant-deserialization, simulation-state-snapshots
---

## Use `[Transient]` for runtime-only state

Use `[Transient]` for runtime-only state: mark fields like HTTP clients, caches, and database connections as transient so they are skipped during serialization and rebuilt on deserialization.
