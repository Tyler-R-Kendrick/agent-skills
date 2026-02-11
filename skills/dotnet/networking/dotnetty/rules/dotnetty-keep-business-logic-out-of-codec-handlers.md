---
title: "Keep business logic out of codec handlers"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnetty, dotnet, networking, high-performance-tcpudp-servers-and-clients, custom-binary-protocol-implementations, netty-style-channel-pipelines
---

## Keep business logic out of codec handlers

; decoders and encoders should only transform data formats, while `SimpleChannelInboundHandler<T>` subclasses handle application logic.
