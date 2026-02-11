---
title: "Enable server reflection"
impact: MEDIUM
impactDescription: "general best practice"
tags: grpc-dotnet, dotnet, networking, grpc-service-definitions, proto-file-compilation, unary-and-streaming-rpcs
---

## Enable server reflection

Enable server reflection: in development (`builder.Services.AddGrpcReflection()`) so tools like `grpcurl` and `grpcui` can discover and test services without the `.proto` file.
