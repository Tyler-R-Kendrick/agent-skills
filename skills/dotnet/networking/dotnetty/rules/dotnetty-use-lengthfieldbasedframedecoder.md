---
title: "Use `LengthFieldBasedFrameDecoder`"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnetty, dotnet, networking, high-performance-tcpudp-servers-and-clients, custom-binary-protocol-implementations, netty-style-channel-pipelines
---

## Use `LengthFieldBasedFrameDecoder`

Use `LengthFieldBasedFrameDecoder`: for TCP framing to handle message boundaries correctly; raw TCP provides a byte stream, not message boundaries.
