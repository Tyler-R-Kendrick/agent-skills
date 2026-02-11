# Caching Rules

Best practices and rules for Caching.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always set both `AbsoluteExpiration` and... | CRITICAL | [`extensions-caching-always-set-both-absoluteexpiration-and.md`](extensions-caching-always-set-both-absoluteexpiration-and.md) |
| 2 | Use `SetSize` on every `IMemoryCache` entry when... | HIGH | [`extensions-caching-use-setsize-on-every-imemorycache-entry-when.md`](extensions-caching-use-setsize-on-every-imemorycache-entry-when.md) |
| 3 | Prefer `HybridCache | HIGH | [`extensions-caching-prefer-hybridcache.md`](extensions-caching-prefer-hybridcache.md) |
| 4 | Namespace cache keys with a prefix (e | HIGH | [`extensions-caching-namespace-cache-keys-with-a-prefix-e.md`](extensions-caching-namespace-cache-keys-with-a-prefix-e.md) |
| 5 | Use tag-based eviction with Output Caching or `HybridCache`... | HIGH | [`extensions-caching-use-tag-based-eviction-with-output-caching-or-hybridcache.md`](extensions-caching-use-tag-based-eviction-with-output-caching-or-hybridcache.md) |
| 6 | Register `IDistributedCache` with... | CRITICAL | [`extensions-caching-register-idistributedcache-with.md`](extensions-caching-register-idistributedcache-with.md) |
| 7 | Log cache misses at the `Debug` level and cache evictions... | MEDIUM | [`extensions-caching-log-cache-misses-at-the-debug-level-and-cache-evictions.md`](extensions-caching-log-cache-misses-at-the-debug-level-and-cache-evictions.md) |
| 8 | Avoid caching mutable objects with `IMemoryCache` because... | HIGH | [`extensions-caching-avoid-caching-mutable-objects-with-imemorycache-because.md`](extensions-caching-avoid-caching-mutable-objects-with-imemorycache-because.md) |
| 9 | Set `CacheItemPriority | CRITICAL | [`extensions-caching-set-cacheitempriority.md`](extensions-caching-set-cacheitempriority.md) |
| 10 | Measure cache hit rates and latency in production using... | CRITICAL | [`extensions-caching-measure-cache-hit-rates-and-latency-in-production-using.md`](extensions-caching-measure-cache-hit-rates-and-latency-in-production-using.md) |
