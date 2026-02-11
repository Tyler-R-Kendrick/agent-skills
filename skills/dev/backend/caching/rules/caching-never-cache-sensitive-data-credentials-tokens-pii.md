---
title: "Never cache sensitive data (credentials, tokens, PII)..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: caching, dev, backend, caching-strategy-selection, cache-invalidation, cache-aside-pattern
---

## Never cache sensitive data (credentials, tokens, PII)...

Never cache sensitive data (credentials, tokens, PII) without encryption and strict TTLs.
