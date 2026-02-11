---
title: "Use `GrpcClientFactory`"
impact: MEDIUM
impactDescription: "general best practice"
tags: grpc-dotnet, dotnet, networking, grpc-service-definitions, proto-file-compilation, unary-and-streaming-rpcs
---

## Use `GrpcClientFactory`

(`AddGrpcClient<T>`) instead of manually creating channels, so clients benefit from `HttpClientFactory` pooling, resilience handlers, and DI integration.
