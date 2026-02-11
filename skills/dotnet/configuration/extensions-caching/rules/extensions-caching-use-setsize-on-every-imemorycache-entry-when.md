---
title: "Use `SetSize` on every `IMemoryCache` entry when..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-caching, dotnet, configuration, in-memory-caching-with-imemorycache, distributed-caching-with-idistributedcache, output-caching-in-aspnet-core
---

## Use `SetSize` on every `IMemoryCache` entry when...

Use `SetSize` on every `IMemoryCache` entry when `SizeLimit` is configured; entries without a size are rejected when a limit is enforced.
