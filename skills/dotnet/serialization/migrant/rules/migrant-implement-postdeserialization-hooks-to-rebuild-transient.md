---
title: "Implement `[PostDeserialization]` hooks to rebuild transient state"
impact: MEDIUM
impactDescription: "general best practice"
tags: migrant, dotnet, serialization, fast-binary-serialization-of-complex-object-graphs, version-tolerant-deserialization, simulation-state-snapshots
---

## Implement `[PostDeserialization]` hooks to rebuild transient state

Implement `[PostDeserialization]` hooks to rebuild transient state: use this attribute on private methods to reinitialize connections, caches, or computed values after deserialization.
