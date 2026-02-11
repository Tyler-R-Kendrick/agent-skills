---
title: "Set `KeepAliveInterval` and `ClientTimeoutInterval`"
impact: MEDIUM
impactDescription: "general best practice"
tags: signalr, dotnet, web, building-real-time-web-features-using-aspnet-core-signalr-with-websocket, server-sent-events, and-long-polling-transports-use-when-implementing-live-chat
---

## Set `KeepAliveInterval` and `ClientTimeoutInterval`

Set `KeepAliveInterval` and `ClientTimeoutInterval`: to values appropriate for your network conditions (e.g., 15s keep-alive, 30s timeout for low-latency networks; 30s/60s for mobile), because the defaults may be too aggressive for clients on unreliable connections, causing unnecessary reconnections.
