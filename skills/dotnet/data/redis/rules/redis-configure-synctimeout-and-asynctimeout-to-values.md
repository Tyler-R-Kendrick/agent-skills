---
title: "Configure `SyncTimeout` and `AsyncTimeout` to values..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: redis, dotnet, data, distributed-caching, session-storage, real-time-pubsub-messaging
---

## Configure `SyncTimeout` and `AsyncTimeout` to values...

Configure `SyncTimeout` and `AsyncTimeout` to values appropriate for your latency requirements (typically 1-5 seconds) and handle `TimeoutException` with retries.
