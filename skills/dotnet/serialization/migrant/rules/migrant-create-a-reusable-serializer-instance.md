---
title: "Create a reusable `Serializer` instance"
impact: MEDIUM
impactDescription: "general best practice"
tags: migrant, dotnet, serialization, fast-binary-serialization-of-complex-object-graphs, version-tolerant-deserialization, simulation-state-snapshots
---

## Create a reusable `Serializer` instance

Create a reusable `Serializer` instance: the Migrant serializer generates IL at runtime for each type it encounters; reusing the instance amortizes this startup cost across multiple operations.
