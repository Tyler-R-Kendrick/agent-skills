---
title: "Keep hub methods thin"
impact: MEDIUM
impactDescription: "general best practice"
tags: signalr, dotnet, web, building-real-time-web-features-using-aspnet-core-signalr-with-websocket, server-sent-events, and-long-polling-transports-use-when-implementing-live-chat
---

## Keep hub methods thin

Keep hub methods thin: by delegating business logic to injected services and using the hub only for message routing, because hub instances are transient (created per invocation) and should not hold state between method calls; store per-connection state in a concurrent dictionary keyed by `Context.ConnectionId`.
