---
title: "Enable version tolerance flags for any data that persists beyond a single app version"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: migrant, dotnet, serialization, fast-binary-serialization-of-complex-object-graphs, version-tolerant-deserialization, simulation-state-snapshots
---

## Enable version tolerance flags for any data that persists beyond a single app version

Enable version tolerance flags for any data that persists beyond a single app version: use `AllowFieldAddition | AllowFieldRemoval` to ensure saved data remains loadable after class changes.
