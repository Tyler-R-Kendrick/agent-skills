---
title: "Set `AbortOnConnectFail = false` in `ConfigurationOptions`..."
impact: MEDIUM
impactDescription: "general best practice"
tags: redis, dotnet, data, distributed-caching, session-storage, real-time-pubsub-messaging
---

## Set `AbortOnConnectFail = false` in `ConfigurationOptions`...

Set `AbortOnConnectFail = false` in `ConfigurationOptions` so the client retries connections gracefully rather than throwing an exception on the first failure.
