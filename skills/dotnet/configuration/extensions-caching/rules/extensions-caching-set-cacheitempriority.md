---
title: "Set `CacheItemPriority"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-caching, dotnet, configuration, in-memory-caching-with-imemorycache, distributed-caching-with-idistributedcache, output-caching-in-aspnet-core
---

## Set `CacheItemPriority

Set `CacheItemPriority.NeverRemove` only for entries that are truly critical and small; overusing it defeats the purpose of memory-pressure eviction.
