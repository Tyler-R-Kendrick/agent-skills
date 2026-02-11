---
title: "Use `IByteBuffer` pooling"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: dotnetty, dotnet, networking, high-performance-tcpudp-servers-and-clients, custom-binary-protocol-implementations, netty-style-channel-pipelines
---

## Use `IByteBuffer` pooling

(`PooledByteBufferAllocator`) instead of unpooled allocators in production to reduce garbage collection pressure under high throughput.
