---
title: "Declare `[ProtoInclude]` on base types for inheritance"
impact: MEDIUM
impactDescription: "general best practice"
tags: protobuf-net, dotnet, serialization, high-performance-binary-serialization, grpc-service-contracts, cross-language-data-interchange
---

## Declare `[ProtoInclude]` on base types for inheritance

Declare `[ProtoInclude]` on base types for inheritance: each derived type needs a unique tag number on the base class; plan these carefully as they cannot change after deployment.
