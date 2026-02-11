---
title: "Handle `RpcException` by `StatusCode`"
impact: MEDIUM
impactDescription: "general best practice"
tags: grpc-dotnet, dotnet, networking, grpc-service-definitions, proto-file-compilation, unary-and-streaming-rpcs
---

## Handle `RpcException` by `StatusCode`

Handle `RpcException` by `StatusCode`: on the client side and throw `RpcException` with appropriate status codes on the server side instead of returning error payloads in the response message.
