---
title: "Register interceptors for cross-cutting concerns"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: grpc-dotnet, dotnet, networking, grpc-service-definitions, proto-file-compilation, unary-and-streaming-rpcs
---

## Register interceptors for cross-cutting concerns

(logging, metrics, auth token injection) rather than duplicating the logic in every service method.
