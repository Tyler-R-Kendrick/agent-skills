---
description: Guidance for Microsoft.Extensions.Caching.
metadata:
  displayName: Caching
---

# Caching

## Overview
Use `IMemoryCache` for in-process caching and `IDistributedCache` for shared caches.

## Example
```csharp
builder.Services.AddMemoryCache();

public sealed class CatalogCache(IMemoryCache cache)
{
	public Task<string> GetAsync(string key, Func<Task<string>> factory)
		=> cache.GetOrCreateAsync(key, _ => factory());
}
```

## Guidance
- Set explicit expirations and size limits.
- Keep cache keys stable and versioned.
