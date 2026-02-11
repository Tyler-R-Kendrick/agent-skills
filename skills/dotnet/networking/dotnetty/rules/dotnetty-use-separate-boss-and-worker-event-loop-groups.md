---
title: "Use separate boss and worker event loop groups"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnetty, dotnet, networking, high-performance-tcpudp-servers-and-clients, custom-binary-protocol-implementations, netty-style-channel-pipelines
---

## Use separate boss and worker event loop groups

Use separate boss and worker event loop groups: for servers: one thread for the boss group (accepting connections) and `Environment.ProcessorCount` threads for the worker group (processing I/O).
