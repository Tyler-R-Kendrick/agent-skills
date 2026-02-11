---
title: "Use `FireAndForget` command flags on non-critical write..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: redis, dotnet, data, distributed-caching, session-storage, real-time-pubsub-messaging
---

## Use `FireAndForget` command flags on non-critical write...

Use `FireAndForget` command flags on non-critical write operations (e.g., analytics counters) to reduce latency by not waiting for the server acknowledgment.
