---
title: "Avoid using Migrant for cross-process communication"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: migrant, dotnet, serialization, fast-binary-serialization-of-complex-object-graphs, version-tolerant-deserialization, simulation-state-snapshots
---

## Avoid using Migrant for cross-process communication

Migrant embeds .NET type information that tightly couples serializer and deserializer; use protobuf-net or Bond for inter-service messaging.
