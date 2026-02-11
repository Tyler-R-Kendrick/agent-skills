---
title: "Keep interceptors focused on a single concern"
impact: MEDIUM
impactDescription: "general best practice"
tags: aspectcore, dotnet, general, cross-cutting-concerns-via-interceptors, method-level-aop, dynamic-proxies
---

## Keep interceptors focused on a single concern

Keep interceptors focused on a single concern: each interceptor should handle exactly one cross-cutting responsibility (logging, caching, retry, etc.) rather than combining multiple behaviors.
