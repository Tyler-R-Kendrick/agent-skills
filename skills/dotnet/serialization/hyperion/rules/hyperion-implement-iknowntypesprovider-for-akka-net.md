---
title: "Implement `IKnownTypesProvider` for Akka.NET"
impact: MEDIUM
impactDescription: "general best practice"
tags: hyperion, dotnet, serialization, akkanet-actor-message-serialization, polymorphic-type-handling, object-graph-serialization-with-circular-references
---

## Implement `IKnownTypesProvider` for Akka.NET

Implement `IKnownTypesProvider` for Akka.NET: centralize known type registration in a single class rather than scattering configuration across multiple HOCON files.
