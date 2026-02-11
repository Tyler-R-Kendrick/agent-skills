---
title: "Use groups for topic-based messaging"
impact: MEDIUM
impactDescription: "general best practice"
tags: signalr, dotnet, web, building-real-time-web-features-using-aspnet-core-signalr-with-websocket, server-sent-events, and-long-polling-transports-use-when-implementing-live-chat
---

## Use groups for topic-based messaging

(`Groups.AddToGroupAsync(connectionId, "order-123")`) rather than maintaining manual dictionaries of connection IDs, because SignalR manages group membership across reconnections and server restarts when using a backplane like Redis.
