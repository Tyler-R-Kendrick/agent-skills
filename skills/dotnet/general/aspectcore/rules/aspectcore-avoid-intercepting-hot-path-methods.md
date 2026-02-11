---
title: "Avoid intercepting hot-path methods"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: aspectcore, dotnet, general, cross-cutting-concerns-via-interceptors, method-level-aop, dynamic-proxies
---

## Avoid intercepting hot-path methods

Avoid intercepting hot-path methods: where nanosecond-level performance matters, as dynamic proxy invocation adds overhead per call.
