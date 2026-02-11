---
title: "Enable rate limiting per route with `RateLimitOptions`"
impact: MEDIUM
impactDescription: "general best practice"
tags: ocelot, dotnet, web, building-api-gateways-in-net-using-ocelot-for-microservices-architectures-use-when-you-need-request-routing, load-balancing, rate-limiting
---

## Enable rate limiting per route with `RateLimitOptions`

Enable rate limiting per route with `RateLimitOptions`: specifying `Period`, `Limit`, and `PeriodTimespan` (the retry-after seconds), and set `HttpStatusCode` to 429 in `GlobalConfiguration.RateLimitOptions`, so that abusive clients receive standard rate-limit headers without downstream services being overwhelmed.
