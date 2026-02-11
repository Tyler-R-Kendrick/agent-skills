---
title: "Use `KeyExpireAsync` on every key that is not meant to live..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: redis, dotnet, data, distributed-caching, session-storage, real-time-pubsub-messaging
---

## Use `KeyExpireAsync` on every key that is not meant to live...

Use `KeyExpireAsync` on every key that is not meant to live forever to prevent unbounded memory growth in the Redis instance.
