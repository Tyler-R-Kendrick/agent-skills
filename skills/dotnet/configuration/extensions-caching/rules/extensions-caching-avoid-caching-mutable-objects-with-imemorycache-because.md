---
title: "Avoid caching mutable objects with `IMemoryCache` because..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-caching, dotnet, configuration, in-memory-caching-with-imemorycache, distributed-caching-with-idistributedcache, output-caching-in-aspnet-core
---

## Avoid caching mutable objects with `IMemoryCache` because...

Avoid caching mutable objects with `IMemoryCache` because it stores references, not copies; mutations to the returned object silently corrupt the cached value.
