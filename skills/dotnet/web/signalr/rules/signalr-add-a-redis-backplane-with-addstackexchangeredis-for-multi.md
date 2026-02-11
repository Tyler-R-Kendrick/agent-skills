---
title: "Add a Redis backplane with `.AddStackExchangeRedis()` for multi-server deployments"
impact: MEDIUM
impactDescription: "general best practice"
tags: signalr, dotnet, web, building-real-time-web-features-using-aspnet-core-signalr-with-websocket, server-sent-events, and-long-polling-transports-use-when-implementing-live-chat
---

## Add a Redis backplane with `.AddStackExchangeRedis()` for multi-server deployments

Add a Redis backplane with `.AddStackExchangeRedis()` for multi-server deployments: so that messages sent from one server reach clients connected to other servers; without a backplane, `Clients.All` only reaches clients connected to the same server instance.
