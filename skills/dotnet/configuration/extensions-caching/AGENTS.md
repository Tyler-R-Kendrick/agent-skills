# Microsoft.Extensions.Caching

## Overview

Microsoft.Extensions.Caching provides two primary abstractions for caching in .NET applications: `IMemoryCache` for in-process caching and `IDistributedCache` for shared caching across multiple application instances. Both are registered through dependency injection and integrate with the standard hosting model. Starting with .NET 9, `HybridCache` combines both layers into a unified API that handles stampede protection and serialization automatically.

The `Microsoft.Extensions.Caching.Memory` package provides the in-memory implementation, while `Microsoft.Extensions.Caching.StackExchangeRedis`, `Microsoft.Extensions.Caching.SqlServer`, and `Microsoft.Extensions.Caching.Cosmos` provide distributed cache backends.

## In-Memory Caching with IMemoryCache

Register `IMemoryCache` and use `GetOrCreateAsync` to implement the cache-aside pattern.

```csharp
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddMemoryCache(options =>
{
    options.SizeLimit = 1024; // Maximum number of cache entries (unitless)
});

var app = builder.Build();
```

```csharp
using Microsoft.Extensions.Caching.Memory;

public sealed class ProductCatalogCache
{
    private readonly IMemoryCache _cache;
    private readonly IProductRepository _repository;

    public ProductCatalogCache(IMemoryCache cache, IProductRepository repository)
    {
        _cache = cache;
        _repository = repository;
    }

    public async Task<Product?> GetProductAsync(int productId, CancellationToken ct)
    {
        string cacheKey = $"product:{productId}";

        return await _cache.GetOrCreateAsync(cacheKey, async entry =>
        {
            entry.SetAbsoluteExpiration(TimeSpan.FromMinutes(10));
            entry.SetSlidingExpiration(TimeSpan.FromMinutes(2));
            entry.SetSize(1);
            entry.SetPriority(CacheItemPriority.Normal);

            return await _repository.GetByIdAsync(productId, ct);
        });
    }

    public void InvalidateProduct(int productId)
    {
        _cache.Remove($"product:{productId}");
    }
}
```

## Distributed Caching with IDistributedCache

Use `IDistributedCache` when cached data must be shared across multiple application instances or survive process restarts.

```csharp
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

// Redis-backed distributed cache
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("Redis");
    options.InstanceName = "myapp:";
});
```

```csharp
using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;

public sealed class SessionDataCache
{
    private readonly IDistributedCache _cache;

    public SessionDataCache(IDistributedCache cache)
    {
        _cache = cache;
    }

    public async Task SetAsync<T>(string key, T value, CancellationToken ct)
    {
        var options = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1),
            SlidingExpiration = TimeSpan.FromMinutes(15)
        };

        byte[] bytes = JsonSerializer.SerializeToUtf8Bytes(value);
        await _cache.SetAsync(key, bytes, options, ct);
    }

    public async Task<T?> GetAsync<T>(string key, CancellationToken ct)
    {
        byte[]? bytes = await _cache.GetAsync(key, ct);
        if (bytes is null)
        {
            return default;
        }
        return JsonSerializer.Deserialize<T>(bytes);
    }

    public Task RemoveAsync(string key, CancellationToken ct)
    {
        return _cache.RemoveAsync(key, ct);
    }
}
```

## HybridCache (.NET 9+)

`HybridCache` unifies in-memory and distributed caching with built-in stampede protection, meaning only one caller fetches the value while others wait.

```csharp
using Microsoft.Extensions.Caching.Hybrid;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHybridCache(options =>
{
    options.DefaultEntryOptions = new HybridCacheEntryOptions
    {
        Expiration = TimeSpan.FromMinutes(30),
        LocalCacheExpiration = TimeSpan.FromMinutes(5)
    };
    options.MaximumPayloadBytes = 1024 * 1024; // 1 MB
});

// Add a distributed backend (optional; falls back to memory-only if omitted)
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "localhost:6379";
});
```

```csharp
using Microsoft.Extensions.Caching.Hybrid;

public sealed class OrderSummaryService
{
    private readonly HybridCache _cache;
    private readonly IOrderRepository _orders;

    public OrderSummaryService(HybridCache cache, IOrderRepository orders)
    {
        _cache = cache;
        _orders = orders;
    }

    public async Task<OrderSummary> GetSummaryAsync(Guid orderId, CancellationToken ct)
    {
        return await _cache.GetOrCreateAsync(
            $"order-summary:{orderId}",
            async cancel => await _orders.GetSummaryAsync(orderId, cancel),
            cancellationToken: ct);
    }

    public async Task InvalidateAsync(Guid orderId, CancellationToken ct)
    {
        await _cache.RemoveAsync($"order-summary:{orderId}", ct);
    }
}
```

## Output Caching in ASP.NET Core

Output caching stores entire HTTP responses, eliminating repeated request processing.

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(policy => policy.Expire(TimeSpan.FromSeconds(60)));
    options.AddPolicy("ProductList", policy =>
        policy.Tag("products").Expire(TimeSpan.FromMinutes(5)));
});

var app = builder.Build();
app.UseOutputCache();

app.MapGet("/api/products", async (IProductRepository repo) =>
{
    return await repo.GetAllAsync();
}).CacheOutput("ProductList");

// Invalidate by tag
app.MapPost("/api/products", async (
    Product product,
    IProductRepository repo,
    IOutputCacheStore store,
    CancellationToken ct) =>
{
    await repo.CreateAsync(product, ct);
    await store.EvictByTagAsync("products", ct);
    return Results.Created($"/api/products/{product.Id}", product);
});

app.Run();
```

## Caching Strategy Comparison

| Strategy | Scope | Persistence | Stampede Protection | Serialization |
|---|---|---|---|---|
| IMemoryCache | Single process | No | No (manual) | Not needed |
| IDistributedCache | Cross-process | Yes (backend) | No (manual) | Manual (bytes) |
| HybridCache | Both layers | Yes (backend) | Built-in | Automatic |
| Output Caching | HTTP responses | Configurable | N/A | N/A |

## Best Practices

1. Always set both `AbsoluteExpiration` and `SlidingExpiration` on cache entries to prevent unbounded memory growth and stale data accumulating over time.
2. Use `SetSize` on every `IMemoryCache` entry when `SizeLimit` is configured; entries without a size are rejected when a limit is enforced.
3. Prefer `HybridCache.GetOrCreateAsync` over manual `IMemoryCache` plus `IDistributedCache` layering to get built-in stampede protection without custom locking.
4. Namespace cache keys with a prefix (e.g., `"catalog:product:{id}"`) to avoid collisions between different features sharing the same cache instance.
5. Use tag-based eviction with Output Caching or `HybridCache` to invalidate groups of related entries when source data changes, rather than tracking individual keys.
6. Register `IDistributedCache` with `AddStackExchangeRedisCache` or another durable backend in production; never rely on the in-memory distributed cache implementation for multi-instance deployments.
7. Log cache misses at the `Debug` level and cache evictions at `Information` to diagnose hit-rate problems without flooding logs under normal operation.
8. Avoid caching mutable objects with `IMemoryCache` because it stores references, not copies; mutations to the returned object silently corrupt the cached value.
9. Set `CacheItemPriority.NeverRemove` only for entries that are truly critical and small; overusing it defeats the purpose of memory-pressure eviction.
10. Measure cache hit rates and latency in production using metrics from `System.Diagnostics.Metrics` or Application Insights to validate that caching actually improves throughput.
