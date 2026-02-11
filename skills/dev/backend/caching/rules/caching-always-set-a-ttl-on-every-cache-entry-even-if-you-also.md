---
title: "Always set a TTL on every cache entry -- even if you also..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: caching, dev, backend, caching-strategy-selection, cache-invalidation, cache-aside-pattern
---

## Always set a TTL on every cache entry -- even if you also...

Always set a TTL on every cache entry -- even if you also use event-based invalidation. TTL is your safety net against stale data from missed events.
