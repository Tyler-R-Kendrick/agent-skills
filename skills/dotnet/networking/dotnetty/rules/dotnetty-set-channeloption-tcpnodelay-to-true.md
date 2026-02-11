---
title: "Set `ChannelOption.TcpNodelay` to `true`"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnetty, dotnet, networking, high-performance-tcpudp-servers-and-clients, custom-binary-protocol-implementations, netty-style-channel-pipelines
---

## Set `ChannelOption.TcpNodelay` to `true`

Set `ChannelOption.TcpNodelay` to `true`: on clients to disable Nagle's algorithm for low-latency request-response protocols.
