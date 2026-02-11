---
title: "Use `.proto` files as the single source of truth"
impact: MEDIUM
impactDescription: "general best practice"
tags: grpc-dotnet, dotnet, networking, grpc-service-definitions, proto-file-compilation, unary-and-streaming-rpcs
---

## Use `.proto` files as the single source of truth

Use `.proto` files as the single source of truth: for service contracts and share them via a NuGet package or git submodule across client and server repositories.
