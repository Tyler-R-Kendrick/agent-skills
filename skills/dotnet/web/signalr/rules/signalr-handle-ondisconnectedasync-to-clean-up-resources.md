---
title: "Handle `OnDisconnectedAsync` to clean up resources"
impact: MEDIUM
impactDescription: "general best practice"
tags: signalr, dotnet, web, building-real-time-web-features-using-aspnet-core-signalr-with-websocket, server-sent-events, and-long-polling-transports-use-when-implementing-live-chat
---

## Handle `OnDisconnectedAsync` to clean up resources

(remove from custom tracking, update online presence, release locks) and log the disconnect reason from the `exception` parameter, because clients disconnect without explicit notification when they close the browser, lose network, or the process crashes.
