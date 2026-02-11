---
title: "Prefer `Serializer.Serialize` to stream over byte arrays"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: protobuf-net, dotnet, serialization, high-performance-binary-serialization, grpc-service-contracts, cross-language-data-interchange
---

## Prefer `Serializer.Serialize` to stream over byte arrays

Prefer `Serializer.Serialize` to stream over byte arrays: serialize directly to `Stream` (network, file) to avoid intermediate `byte[]` allocations; use `MemoryStream` only when you need the bytes.
