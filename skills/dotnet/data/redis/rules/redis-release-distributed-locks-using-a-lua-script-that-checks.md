---
title: "Release distributed locks using a Lua script that checks..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: redis, dotnet, data, distributed-caching, session-storage, real-time-pubsub-messaging
---

## Release distributed locks using a Lua script that checks...

Release distributed locks using a Lua script that checks ownership before deleting to prevent accidentally releasing a lock acquired by another process after expiry.
