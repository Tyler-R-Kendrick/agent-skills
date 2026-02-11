---
title: "Register `IDistributedCache` with..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-caching, dotnet, configuration, in-memory-caching-with-imemorycache, distributed-caching-with-idistributedcache, output-caching-in-aspnet-core
---

## Register `IDistributedCache` with...

Register `IDistributedCache` with `AddStackExchangeRedisCache` or another durable backend in production; never rely on the in-memory distributed cache implementation for multi-instance deployments.
