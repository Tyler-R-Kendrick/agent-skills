---
title: "Implement `ExceptionCaught` in every handler"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnetty, dotnet, networking, high-performance-tcpudp-servers-and-clients, custom-binary-protocol-implementations, netty-style-channel-pipelines
---

## Implement `ExceptionCaught` in every handler

Implement `ExceptionCaught` in every handler: and close the channel on unrecoverable errors; unhandled exceptions in the pipeline silently drop messages.
