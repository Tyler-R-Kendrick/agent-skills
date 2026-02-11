---
title: "Monitor serialized data size growth"
impact: LOW
impactDescription: "recommended but situational"
tags: migrant, dotnet, serialization, fast-binary-serialization-of-complex-object-graphs, version-tolerant-deserialization, simulation-state-snapshots
---

## Monitor serialized data size growth

Monitor serialized data size growth: as types evolve and fields accumulate, serialized payload sizes can grow; periodically benchmark payload sizes and consider migration strategies for bloated types.
