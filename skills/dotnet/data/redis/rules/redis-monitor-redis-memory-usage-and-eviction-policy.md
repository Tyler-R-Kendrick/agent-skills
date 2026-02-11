---
title: "Monitor Redis memory usage and eviction policy..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: redis, dotnet, data, distributed-caching, session-storage, real-time-pubsub-messaging
---

## Monitor Redis memory usage and eviction policy...

Monitor Redis memory usage and eviction policy (`maxmemory-policy`) in production; use `allkeys-lru` for cache workloads and `noeviction` for data that must not be lost.
