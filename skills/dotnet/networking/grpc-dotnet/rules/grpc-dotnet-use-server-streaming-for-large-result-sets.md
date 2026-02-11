---
title: "Use server streaming for large result sets"
impact: MEDIUM
impactDescription: "general best practice"
tags: grpc-dotnet, dotnet, networking, grpc-service-definitions, proto-file-compilation, unary-and-streaming-rpcs
---

## Use server streaming for large result sets

Use server streaming for large result sets: instead of returning a single response with a large repeated field, to reduce memory pressure and enable progressive rendering.
