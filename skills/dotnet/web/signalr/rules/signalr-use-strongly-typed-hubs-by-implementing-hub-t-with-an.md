---
title: "Use strongly-typed hubs by implementing `Hub<T>` with an interface"
impact: MEDIUM
impactDescription: "general best practice"
tags: signalr, dotnet, web, building-real-time-web-features-using-aspnet-core-signalr-with-websocket, server-sent-events, and-long-polling-transports-use-when-implementing-live-chat
---

## Use strongly-typed hubs by implementing `Hub<T>` with an interface

(e.g., `Hub<INotificationClient>`) instead of `Hub` with string-based `SendAsync("MethodName")` calls, so that client method invocations are checked at compile time and refactoring client method names does not silently break real-time messaging.
