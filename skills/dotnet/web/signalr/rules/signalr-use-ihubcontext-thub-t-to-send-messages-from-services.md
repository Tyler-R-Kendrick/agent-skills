---
title: "Use `IHubContext<THub, T>` to send messages from services, controllers, and background workers"
impact: MEDIUM
impactDescription: "general best practice"
tags: signalr, dotnet, web, building-real-time-web-features-using-aspnet-core-signalr-with-websocket, server-sent-events, and-long-polling-transports-use-when-implementing-live-chat
---

## Use `IHubContext<THub, T>` to send messages from services, controllers, and background workers

Use `IHubContext<THub, T>` to send messages from services, controllers, and background workers: rather than storing hub references or static connection lists, because `IHubContext` is managed by the DI container and works correctly across the application's lifetime regardless of hub instance creation and disposal.
