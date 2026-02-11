---
title: "Generate `.proto` files from your C# types for cross-language consumers"
impact: MEDIUM
impactDescription: "general best practice"
tags: protobuf-net, dotnet, serialization, high-performance-binary-serialization, grpc-service-contracts, cross-language-data-interchange
---

## Generate `.proto` files from your C# types for cross-language consumers

Generate `.proto` files from your C# types for cross-language consumers: use `Serializer.GetProto<T>()` to export `.proto` schema files that Java, Go, or Python clients can compile and use.
