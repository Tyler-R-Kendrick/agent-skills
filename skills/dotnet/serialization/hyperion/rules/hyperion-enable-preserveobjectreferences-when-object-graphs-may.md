---
title: "Enable `preserveObjectReferences` when object graphs may contain cycles"
impact: MEDIUM
impactDescription: "general best practice"
tags: hyperion, dotnet, serialization, akkanet-actor-message-serialization, polymorphic-type-handling, object-graph-serialization-with-circular-references
---

## Enable `preserveObjectReferences` when object graphs may contain cycles

Enable `preserveObjectReferences` when object graphs may contain cycles: without this option, circular references cause a `StackOverflowException` during serialization.
