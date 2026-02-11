---
title: "Use hash operations (`HashSetAsync`, `HashGetAsync`) for..."
impact: MEDIUM
impactDescription: "general best practice"
tags: redis, dotnet, data, distributed-caching, session-storage, real-time-pubsub-messaging
---

## Use hash operations (`HashSetAsync`, `HashGetAsync`) for...

Use hash operations (`HashSetAsync`, `HashGetAsync`) for objects with many fields instead of serializing the entire object as a JSON string, enabling partial field updates.
