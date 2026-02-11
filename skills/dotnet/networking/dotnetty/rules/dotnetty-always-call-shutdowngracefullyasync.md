---
title: "Always call `ShutdownGracefullyAsync()`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: dotnetty, dotnet, networking, high-performance-tcpudp-servers-and-clients, custom-binary-protocol-implementations, netty-style-channel-pipelines
---

## Always call `ShutdownGracefullyAsync()`

Always call `ShutdownGracefullyAsync()`: on event loop groups in a `finally` block to release threads and OS resources cleanly on application shutdown.
