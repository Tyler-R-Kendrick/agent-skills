---
title: "Always set both `AbsoluteExpiration` and..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-caching, dotnet, configuration, in-memory-caching-with-imemorycache, distributed-caching-with-idistributedcache, output-caching-in-aspnet-core
---

## Always set both `AbsoluteExpiration` and...

Always set both `AbsoluteExpiration` and `SlidingExpiration` on cache entries to prevent unbounded memory growth and stale data accumulating over time.
