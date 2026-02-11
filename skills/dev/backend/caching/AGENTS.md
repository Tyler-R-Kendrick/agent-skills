# Caching Strategies & Patterns

## Overview
Caching is the practice of storing copies of data in a faster storage layer so that future requests for that data are served more quickly. Effective caching can reduce database load by orders of magnitude, cut response latency dramatically, and improve system resilience -- but incorrect caching introduces stale data, consistency bugs, and operational complexity. Choosing the right caching strategy is a critical backend architecture decision.

## Core Caching Patterns

### Cache-Aside (Lazy Loading)

The application manages the cache explicitly. On a read, the application checks the cache first. On a miss, it loads from the database, stores the result in cache, and returns it.

```
Read path:
  1. App checks cache for key
  2. Cache HIT → return cached value
  3. Cache MISS → query database
  4. Store result in cache with TTL
  5. Return result

Write path:
  1. App writes to database
  2. App invalidates (deletes) the cache key
```

**Pros:** Simple to implement; cache only contains data that is actually requested; works with any database.
**Cons:** First request always hits the database (cold start); potential for stale data between write and invalidation.

**Best for:** General-purpose caching where the application can tolerate brief staleness.

### Read-Through

The cache sits in front of the database and loads data transparently on a miss. The application always reads from the cache -- it never talks to the database directly for reads.

```
Read path:
  1. App reads from cache
  2. Cache HIT → return cached value
  3. Cache MISS → cache loads from database automatically
  4. Cache stores result, returns to app
```

**Pros:** Cleaner application code (no cache miss handling); cache warms itself.
**Cons:** Requires a cache layer that supports read-through (or a wrapper); first request still slow.

**Best for:** Workloads where you want the caching logic decoupled from application code.

### Write-Through

Writes go to the cache first, and the cache synchronously writes to the database before confirming the write to the application.

```
Write path:
  1. App writes to cache
  2. Cache writes to database synchronously
  3. Cache confirms write to app
```

**Pros:** Cache is always consistent with the database; no stale reads after writes.
**Cons:** Higher write latency (two writes in series); cache may contain data that is never read.

**Best for:** Read-heavy workloads where consistency is critical and write volume is moderate.

### Write-Behind (Write-Back)

Writes go to the cache immediately, and the cache asynchronously flushes changes to the database in the background.

```
Write path:
  1. App writes to cache
  2. Cache confirms write to app immediately
  3. Cache asynchronously flushes to database (batched, periodic)
```

**Pros:** Very low write latency; writes can be batched for efficiency; absorbs write spikes.
**Cons:** Risk of data loss if the cache fails before flushing; eventual consistency with the database; complex to implement correctly.

**Best for:** Write-heavy workloads where write latency matters more than durability guarantees (e.g., analytics counters, session updates).

### Write-Around

Writes go directly to the database, bypassing the cache entirely. The cache is populated only on subsequent reads (via cache-aside or read-through).

```
Write path:
  1. App writes directly to database (cache not involved)

Read path:
  1. App reads from cache
  2. Cache MISS → load from database, populate cache
```

**Pros:** Avoids polluting the cache with data that may never be read; simple write path.
**Cons:** Recently written data always misses the cache on first read.

**Best for:** Write-heavy workloads where most written data is rarely read immediately (e.g., log ingestion, audit trails).

## Choosing a Caching Strategy

| Criterion | Cache-Aside | Read-Through | Write-Through | Write-Behind | Write-Around |
|-----------|-------------|--------------|---------------|--------------|--------------|
| **Read latency (after warm)** | Low | Low | Low | Low | Low |
| **Write latency** | Normal (DB only) | Normal (DB only) | Higher (cache + DB) | Very low (cache only) | Normal (DB only) |
| **Consistency** | Eventual | Eventual | Strong | Eventual | Eventual |
| **Data loss risk** | None | None | None | Yes (cache failure) | None |
| **Cache pollution** | Low (demand-filled) | Low (demand-filled) | Higher (all writes cached) | Higher (all writes cached) | Lowest |
| **Implementation complexity** | Low | Medium | Medium | High | Low |
| **Best workload** | General purpose | Read-heavy | Read-heavy + consistency | Write-heavy + low latency | Write-heavy + rarely re-read |

**Decision heuristic:**
- Start with **cache-aside** -- it is the simplest and most widely applicable pattern.
- Use **write-through** when you need strong consistency between cache and database.
- Use **write-behind** when write latency is critical and you can tolerate potential data loss.
- Use **write-around** when most writes are not read back immediately.
- Use **read-through** when you want to keep caching logic out of your application code.

## Cache Invalidation Strategies

Cache invalidation is one of the two hard problems in computer science (along with naming things and off-by-one errors).

| Strategy | Mechanism | Trade-off |
|----------|-----------|-----------|
| **TTL (Time-To-Live)** | Cache entries expire after a fixed duration | Simple; data can be stale up to TTL; good baseline |
| **Event-based** | Invalidate cache when a domain event fires (e.g., `order.updated`) | Near-real-time consistency; requires event infrastructure |
| **Version-based** | Cache key includes a version number; bump version on write | No stale reads; requires version tracking |
| **Tag-based** | Associate cache entries with tags; invalidate all entries with a tag | Good for related data; supported by some cache frameworks |

**Recommendation:** Use TTL as a safety net on every cache entry (even with event-based invalidation). This ensures that stale data eventually expires even if an invalidation event is lost.

## Cache Stampede / Thundering Herd

When a popular cache key expires, many concurrent requests simultaneously miss the cache and hit the database, potentially overwhelming it.

### Solutions

| Solution | How It Works |
|----------|--------------|
| **Mutex / distributed lock** | First request that misses acquires a lock and rebuilds the cache; other requests wait or get stale data |
| **Probabilistic early expiration** | Each request has a small probability of refreshing the cache before TTL expires, spreading the refresh load |
| **Stale-while-revalidate** | Serve the stale value while asynchronously refreshing in the background |
| **Pre-warming** | Proactively refresh cache entries before they expire (scheduled or event-triggered) |

```python
# Probabilistic early expiration (XFetch algorithm)
import random, time

def get_with_early_expiration(cache, key, ttl, beta=1.0):
    entry = cache.get(key)
    if entry is None:
        return recompute_and_cache(cache, key, ttl)

    value, expiry, delta = entry
    # delta = time it took to recompute last time
    # Probabilistically refresh before actual expiry
    if time.time() - delta * beta * random.random() >= expiry:
        return recompute_and_cache(cache, key, ttl)

    return value
```

## CDN Caching

Content Delivery Networks cache responses at edge locations close to users.

### Cache-Control Headers

```http
Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=60
```

| Directive | Meaning |
|-----------|---------|
| `public` | Any cache (CDN, proxy, browser) may store the response |
| `private` | Only the browser may cache (not CDN/proxies) |
| `max-age=N` | Browser cache TTL in seconds |
| `s-maxage=N` | CDN/proxy cache TTL (overrides max-age for shared caches) |
| `no-cache` | Must revalidate with origin before using cached copy |
| `no-store` | Do not cache at all (sensitive data) |
| `stale-while-revalidate=N` | Serve stale for N seconds while revalidating in background |
| `stale-if-error=N` | Serve stale for N seconds if origin returns an error |
| `immutable` | Content will never change (versioned assets) |

### Edge Caching Strategy
- Cache static assets with long TTLs and content-hash filenames (`app.a1b2c3.js` with `immutable`).
- Cache API responses at the CDN with `s-maxage` and `stale-while-revalidate`.
- Use cache tags or surrogate keys for targeted invalidation (supported by Fastly, CloudFront, Cloudflare).

## Application Caching

### Redis vs. Memcached

| Feature | Redis | Memcached |
|---------|-------|-----------|
| **Data structures** | Strings, hashes, lists, sets, sorted sets, streams | Strings only |
| **Persistence** | RDB snapshots, AOF log | None |
| **Replication** | Built-in primary/replica | None (client-side sharding) |
| **Pub/Sub** | Yes | No |
| **Lua scripting** | Yes | No |
| **Max value size** | 512 MB | 1 MB |
| **Multi-threading** | Single-threaded (I/O threads in 6.0+) | Multi-threaded |

**Recommendation:** Use Redis unless you need only simple string caching and prefer Memcached's multi-threaded model for pure throughput at scale.

### In-Memory / Local Cache
- Fastest possible access (no network hop).
- Limited by process memory; not shared across instances.
- Use for extremely hot data with short TTLs (e.g., config, feature flags, rate limit counters).
- Examples: Caffeine (Java), MemoryCache (.NET), node-cache (Node.js), lru-cache (Python).

## HTTP Caching

### ETag and Last-Modified

```
Response:
  ETag: "abc123"
  Last-Modified: Tue, 15 Jan 2024 10:00:00 GMT

Subsequent request:
  If-None-Match: "abc123"
  If-Modified-Since: Tue, 15 Jan 2024 10:00:00 GMT

Server response if unchanged:
  304 Not Modified (no body, saves bandwidth)
```

- **ETag** -- opaque identifier for a specific version of a resource (hash of content or version number).
- **Last-Modified** -- timestamp of last change.
- Both enable conditional requests that save bandwidth when content has not changed.

## Multi-Tier Caching

```
┌─────────────┐    ┌─────────────────┐    ┌──────────┐    ┌──────────┐
│   Client     │───>│  CDN (L3)       │───>│ Redis    │───>│ Database │
│   Browser    │    │  Edge cache     │    │ (L2)     │    │          │
│   cache (L0) │    │                 │    │ Distrib. │    │          │
└─────────────┘    └─────────────────┘    │ cache    │    │          │
                                          └──────────┘    └──────────┘
                                               ▲
                                          ┌──────────┐
                                          │ In-proc  │
                                          │ cache(L1)│
                                          └──────────┘
```

| Tier | Location | Latency | Shared | Capacity |
|------|----------|---------|--------|----------|
| **L0 — Browser** | Client device | ~0 ms | No | Small |
| **L1 — In-process** | Application memory | ~0.01 ms | No (per-instance) | Small-Medium |
| **L2 — Distributed** | Redis / Memcached | ~1 ms | Yes (all instances) | Large |
| **L3 — CDN** | Edge PoP | ~10-50 ms | Yes (per-region) | Very large |
| **Origin** | Database | ~5-50 ms | Yes | Unlimited |

**Strategy:** Check L1 first, then L2, then L3, then origin. Write-through from origin to L2; let L1 fill on demand with short TTLs. CDN serves public, cacheable content.

## Best Practices
- Always set a TTL on every cache entry -- even if you also use event-based invalidation. TTL is your safety net against stale data from missed events.
- Monitor cache hit rates. A hit rate below 80% suggests the cache is not well-tuned for actual access patterns. Investigate and adjust.
- Design for cache failure gracefully: the system must function (possibly with degraded performance) when the cache is unavailable.
- Never cache sensitive data (credentials, tokens, PII) without encryption and strict TTLs.
- Use consistent hashing for distributed cache clusters to minimize key redistribution when nodes are added or removed.
- Prefer cache-aside as the starting pattern. Only move to more complex patterns (write-through, write-behind) when you have measured evidence that they are needed.
- Implement cache stampede protection (locking or probabilistic refresh) for any high-traffic cache keys with expensive recomputation.
