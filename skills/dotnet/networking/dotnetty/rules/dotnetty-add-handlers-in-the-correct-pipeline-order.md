---
title: "Add handlers in the correct pipeline order"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnetty, dotnet, networking, high-performance-tcpudp-servers-and-clients, custom-binary-protocol-implementations, netty-style-channel-pipelines
---

## Add handlers in the correct pipeline order

TLS first (innermost), then frame decoders, then string/object codecs, then business logic handlers last.
