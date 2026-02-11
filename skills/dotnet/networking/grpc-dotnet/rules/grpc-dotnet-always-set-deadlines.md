---
title: "Always set deadlines"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: grpc-dotnet, dotnet, networking, grpc-service-definitions, proto-file-compilation, unary-and-streaming-rpcs
---

## Always set deadlines

Always set deadlines: on client calls using `CallOptions.Deadline` or `deadline:` parameter to prevent indefinite waits when the server is unresponsive.
