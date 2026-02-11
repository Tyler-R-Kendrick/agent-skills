---
title: "Use deep cloning sparingly in hot paths"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: migrant, dotnet, serialization, fast-binary-serialization-of-complex-object-graphs, version-tolerant-deserialization, simulation-state-snapshots
---

## Use deep cloning sparingly in hot paths

Use deep cloning sparingly in hot paths: serialization-based cloning is convenient but allocates intermediate buffers; for performance-critical cloning, consider manual copy constructors.
