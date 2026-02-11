# Caching Strategies & Patterns Rules

Best practices and rules for Caching Strategies & Patterns.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always set a TTL on every cache entry -- even if you also... | CRITICAL | [`caching-always-set-a-ttl-on-every-cache-entry-even-if-you-also.md`](caching-always-set-a-ttl-on-every-cache-entry-even-if-you-also.md) |
| 2 | Monitor cache hit rates | MEDIUM | [`caching-monitor-cache-hit-rates.md`](caching-monitor-cache-hit-rates.md) |
| 3 | Design for cache failure gracefully | CRITICAL | [`caching-design-for-cache-failure-gracefully.md`](caching-design-for-cache-failure-gracefully.md) |
| 4 | Never cache sensitive data (credentials, tokens, PII)... | CRITICAL | [`caching-never-cache-sensitive-data-credentials-tokens-pii.md`](caching-never-cache-sensitive-data-credentials-tokens-pii.md) |
| 5 | Use consistent hashing for distributed cache clusters to... | MEDIUM | [`caching-use-consistent-hashing-for-distributed-cache-clusters-to.md`](caching-use-consistent-hashing-for-distributed-cache-clusters-to.md) |
| 6 | Prefer cache-aside as the starting pattern | LOW | [`caching-prefer-cache-aside-as-the-starting-pattern.md`](caching-prefer-cache-aside-as-the-starting-pattern.md) |
| 7 | Implement cache stampede protection (locking or... | HIGH | [`caching-implement-cache-stampede-protection-locking-or.md`](caching-implement-cache-stampede-protection-locking-or.md) |
