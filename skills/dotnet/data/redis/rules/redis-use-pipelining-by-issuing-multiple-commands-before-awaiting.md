---
title: "Use pipelining by issuing multiple commands before awaiting..."
impact: MEDIUM
impactDescription: "general best practice"
tags: redis, dotnet, data, distributed-caching, session-storage, real-time-pubsub-messaging
---

## Use pipelining by issuing multiple commands before awaiting...

Use pipelining by issuing multiple commands before awaiting any results (`batch = db.CreateBatch()`) to reduce network round trips for bulk operations.
