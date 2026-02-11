---
title: "Design for failure"
impact: MEDIUM
impactDescription: "general best practice"
tags: backend, dev, backend-architecture-decisions, choosing-api-styles, choosing-database-types
---

## Design for failure

Design for failure: every network call can fail, every database can be slow. Use timeouts, retries with backoff, circuit breakers, and fallbacks.
