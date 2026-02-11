---
title: "Use gRPC-Web"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: grpc-dotnet, dotnet, networking, grpc-service-definitions, proto-file-compilation, unary-and-streaming-rpcs
---

## Use gRPC-Web

(`app.MapGrpcService<T>().EnableGrpcWeb()`) when browser clients need to call gRPC services, as browsers do not support HTTP/2 trailers natively.
