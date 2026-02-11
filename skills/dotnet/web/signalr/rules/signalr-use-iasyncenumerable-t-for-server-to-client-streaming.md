---
title: "Use `IAsyncEnumerable<T>` for server-to-client streaming"
impact: MEDIUM
impactDescription: "general best practice"
tags: signalr, dotnet, web, building-real-time-web-features-using-aspnet-core-signalr-with-websocket, server-sent-events, and-long-polling-transports-use-when-implementing-live-chat
---

## Use `IAsyncEnumerable<T>` for server-to-client streaming

Use `IAsyncEnumerable<T>` for server-to-client streaming: of continuous data (stock prices, log tails, progress updates) instead of sending frequent individual messages, because streaming uses a single long-lived channel that is more efficient than repeated hub method invocations.
