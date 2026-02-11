---
title: "Order interceptors deliberately"
impact: MEDIUM
impactDescription: "general best practice"
tags: aspectcore, dotnet, general, cross-cutting-concerns-via-interceptors, method-level-aop, dynamic-proxies
---

## Order interceptors deliberately

Order interceptors deliberately: by setting the `Order` property on `AbstractInterceptorAttribute` when multiple interceptors are applied to the same method.
