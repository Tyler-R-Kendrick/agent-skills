---
title: "Configure `MaximumReceiveMessageSize` to a reasonable limit"
impact: MEDIUM
impactDescription: "general best practice"
tags: signalr, dotnet, web, building-real-time-web-features-using-aspnet-core-signalr-with-websocket, server-sent-events, and-long-polling-transports-use-when-implementing-live-chat
---

## Configure `MaximumReceiveMessageSize` to a reasonable limit

(e.g., 64 KB for chat, 1 MB for file metadata) rather than relying on the default, because unbounded message sizes allow clients to send arbitrarily large payloads that consume server memory and can be used for denial-of-service.
