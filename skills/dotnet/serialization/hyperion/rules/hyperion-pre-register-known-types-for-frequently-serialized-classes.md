---
title: "Pre-register known types for frequently serialized classes"
impact: MEDIUM
impactDescription: "general best practice"
tags: hyperion, dotnet, serialization, akkanet-actor-message-serialization, polymorphic-type-handling, object-graph-serialization-with-circular-references
---

## Pre-register known types for frequently serialized classes

Pre-register known types for frequently serialized classes: adding types to the `knownTypes` list reduces payload size by replacing fully qualified type names with compact identifiers.
