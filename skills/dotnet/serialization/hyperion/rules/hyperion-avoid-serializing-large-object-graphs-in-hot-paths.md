---
title: "Avoid serializing large object graphs in hot paths"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: hyperion, dotnet, serialization, akkanet-actor-message-serialization, polymorphic-type-handling, object-graph-serialization-with-circular-references
---

## Avoid serializing large object graphs in hot paths

Hyperion's reference tracking adds overhead; for simple DTOs without circular references, consider disabling `preserveObjectReferences`.
