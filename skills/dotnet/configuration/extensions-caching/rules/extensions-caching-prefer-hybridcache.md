---
title: "Prefer `HybridCache"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-caching, dotnet, configuration, in-memory-caching-with-imemorycache, distributed-caching-with-idistributedcache, output-caching-in-aspnet-core
---

## Prefer `HybridCache

Prefer `HybridCache.GetOrCreateAsync` over manual `IMemoryCache` plus `IDistributedCache` layering to get built-in stampede protection without custom locking.
