---
title: "Enable `useBuffering` for large serialization operations"
impact: MEDIUM
impactDescription: "general best practice"
tags: migrant, dotnet, serialization, fast-binary-serialization-of-complex-object-graphs, version-tolerant-deserialization, simulation-state-snapshots
---

## Enable `useBuffering` for large serialization operations

Enable `useBuffering` for large serialization operations: buffering improves throughput by reducing the number of I/O operations to the underlying stream.
