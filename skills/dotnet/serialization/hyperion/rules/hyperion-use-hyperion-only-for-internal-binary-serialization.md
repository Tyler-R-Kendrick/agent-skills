---
title: "Use Hyperion only for internal binary serialization"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: hyperion, dotnet, serialization, akkanet-actor-message-serialization, polymorphic-type-handling, object-graph-serialization-with-circular-references
---

## Use Hyperion only for internal binary serialization

Use Hyperion only for internal binary serialization: do not expose Hyperion-serialized data to external consumers; it embeds .NET type metadata that creates tight coupling.
