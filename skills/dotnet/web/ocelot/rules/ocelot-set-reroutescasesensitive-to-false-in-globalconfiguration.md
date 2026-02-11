---
title: "Set `ReRoutesCaseSensitive` to `false` in `GlobalConfiguration`"
impact: MEDIUM
impactDescription: "general best practice"
tags: ocelot, dotnet, web, building-api-gateways-in-net-using-ocelot-for-microservices-architectures-use-when-you-need-request-routing, load-balancing, rate-limiting
---

## Set `ReRoutesCaseSensitive` to `false` in `GlobalConfiguration`

Set `ReRoutesCaseSensitive` to `false` in `GlobalConfiguration`: unless your upstream URLs are intentionally case-sensitive, because clients may send `/Products/123` or `/products/123` and mismatched casing results in 404 responses that are difficult to diagnose.
