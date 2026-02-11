---
title: "Register `ConnectionMultiplexer` as a singleton and reuse..."
impact: MEDIUM
impactDescription: "general best practice"
tags: redis, dotnet, data, distributed-caching, session-storage, real-time-pubsub-messaging
---

## Register `ConnectionMultiplexer` as a singleton and reuse...

Register `ConnectionMultiplexer` as a singleton and reuse it across the entire application; creating multiple multiplexers wastes connections and degrades performance.
