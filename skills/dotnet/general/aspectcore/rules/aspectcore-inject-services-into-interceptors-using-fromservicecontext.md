---
title: "Inject services into interceptors using `[FromServiceContext]`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspectcore, dotnet, general, cross-cutting-concerns-via-interceptors, method-level-aop, dynamic-proxies
---

## Inject services into interceptors using `[FromServiceContext]`

Inject services into interceptors using `[FromServiceContext]`: instead of constructor injection, because interceptor instances are managed by the proxy infrastructure.
