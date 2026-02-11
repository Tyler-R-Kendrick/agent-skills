---
title: "Use `Predicates` in `ConfigureDynamicProxy`"
impact: MEDIUM
impactDescription: "general best practice"
tags: aspectcore, dotnet, general, cross-cutting-concerns-via-interceptors, method-level-aop, dynamic-proxies
---

## Use `Predicates` in `ConfigureDynamicProxy`

Use `Predicates` in `ConfigureDynamicProxy`: to exclude infrastructure services (health checks, middleware components) that should not be proxied.
