---
title: "Always call `await next(context)`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspectcore, dotnet, general, cross-cutting-concerns-via-interceptors, method-level-aop, dynamic-proxies
---

## Always call `await next(context)`

Always call `await next(context)`: in your interceptor unless you intentionally want to short-circuit the method call (e.g., returning a cached result).
