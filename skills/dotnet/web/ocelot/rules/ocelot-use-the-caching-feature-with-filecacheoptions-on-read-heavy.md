---
title: "Use the caching feature with `FileCacheOptions` on read-heavy GET routes"
impact: MEDIUM
impactDescription: "general best practice"
tags: ocelot, dotnet, web, building-api-gateways-in-net-using-ocelot-for-microservices-architectures-use-when-you-need-request-routing, load-balancing, rate-limiting
---

## Use the caching feature with `FileCacheOptions` on read-heavy GET routes

Use the caching feature with `FileCacheOptions` on read-heavy GET routes: specifying `TtlSeconds` to cache downstream responses at the gateway, reducing latency and downstream load for data that changes infrequently (product catalogs, configuration lookups).
