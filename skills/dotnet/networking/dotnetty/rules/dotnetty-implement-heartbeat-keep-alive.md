---
title: "Implement heartbeat/keep-alive"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnetty, dotnet, networking, high-performance-tcpudp-servers-and-clients, custom-binary-protocol-implementations, netty-style-channel-pipelines
---

## Implement heartbeat/keep-alive

Implement heartbeat/keep-alive: with `IdleStateHandler` to detect and clean up dead connections that the OS TCP stack has not yet timed out.
