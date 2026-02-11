---
title: "Forward JWT tokens via query string for WebSocket connections"
impact: MEDIUM
impactDescription: "general best practice"
tags: signalr, dotnet, web, building-real-time-web-features-using-aspnet-core-signalr-with-websocket, server-sent-events, and-long-polling-transports-use-when-implementing-live-chat
---

## Forward JWT tokens via query string for WebSocket connections

Forward JWT tokens via query string for WebSocket connections: by handling `JwtBearerEvents.OnMessageReceived` and extracting the token from `context.Request.Query["access_token"]`, because browsers cannot set custom headers on WebSocket upgrade requests and the standard `Authorization` header is unavailable.
