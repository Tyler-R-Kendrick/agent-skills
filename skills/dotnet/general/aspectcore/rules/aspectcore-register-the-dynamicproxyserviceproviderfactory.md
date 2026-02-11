---
title: "Register the `DynamicProxyServiceProviderFactory`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspectcore, dotnet, general, cross-cutting-concerns-via-interceptors, method-level-aop, dynamic-proxies
---

## Register the `DynamicProxyServiceProviderFactory`

Register the `DynamicProxyServiceProviderFactory`: on the host builder -- without this step, no proxies are generated and interceptors silently do nothing.
