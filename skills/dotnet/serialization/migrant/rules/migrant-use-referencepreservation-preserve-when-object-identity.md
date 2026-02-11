---
title: "Use `ReferencePreservation.Preserve` when object identity matters"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: migrant, dotnet, serialization, fast-binary-serialization-of-complex-object-graphs, version-tolerant-deserialization, simulation-state-snapshots
---

## Use `ReferencePreservation.Preserve` when object identity matters

Use `ReferencePreservation.Preserve` when object identity matters: this ensures that two references to the same object remain the same reference after deserialization, critical for circular graphs.
