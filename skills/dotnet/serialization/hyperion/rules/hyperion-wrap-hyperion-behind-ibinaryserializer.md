---
title: "Wrap Hyperion behind `IBinarySerializer`"
impact: MEDIUM
impactDescription: "general best practice"
tags: hyperion, dotnet, serialization, akkanet-actor-message-serialization, polymorphic-type-handling, object-graph-serialization-with-circular-references
---

## Wrap Hyperion behind `IBinarySerializer`

Wrap Hyperion behind `IBinarySerializer`: decouple your business logic from Hyperion so you can switch to a different serializer (e.g., MessagePack) without touching domain code.
