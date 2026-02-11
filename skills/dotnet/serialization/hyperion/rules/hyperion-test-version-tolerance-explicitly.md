---
title: "Test version tolerance explicitly"
impact: MEDIUM
impactDescription: "general best practice"
tags: hyperion, dotnet, serialization, akkanet-actor-message-serialization, polymorphic-type-handling, object-graph-serialization-with-circular-references
---

## Test version tolerance explicitly

Test version tolerance explicitly: write tests that serialize an object with version N, add a field, and deserialize with version N+1 to verify backward compatibility.
