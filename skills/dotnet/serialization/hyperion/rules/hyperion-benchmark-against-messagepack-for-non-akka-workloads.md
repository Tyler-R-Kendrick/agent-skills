---
title: "Benchmark against MessagePack for non-Akka workloads"
impact: MEDIUM
impactDescription: "general best practice"
tags: hyperion, dotnet, serialization, akkanet-actor-message-serialization, polymorphic-type-handling, object-graph-serialization-with-circular-references
---

## Benchmark against MessagePack for non-Akka workloads

Hyperion is optimized for Akka.NET patterns; for generic binary serialization, MessagePack may offer better throughput.
