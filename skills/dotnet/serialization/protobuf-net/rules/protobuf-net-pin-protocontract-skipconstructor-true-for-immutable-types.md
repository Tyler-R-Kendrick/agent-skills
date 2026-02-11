---
title: "Pin `[ProtoContract(SkipConstructor = true)]` for immutable types"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: protobuf-net, dotnet, serialization, high-performance-binary-serialization, grpc-service-contracts, cross-language-data-interchange
---

## Pin `[ProtoContract(SkipConstructor = true)]` for immutable types

Pin `[ProtoContract(SkipConstructor = true)]` for immutable types: this tells protobuf-net to bypass the constructor during deserialization, avoiding issues with required constructor parameters.
