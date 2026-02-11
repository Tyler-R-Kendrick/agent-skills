---
title: "Assign a unique `Key` property to routes used in aggregation"
impact: MEDIUM
impactDescription: "general best practice"
tags: ocelot, dotnet, web, building-api-gateways-in-net-using-ocelot-for-microservices-architectures-use-when-you-need-request-routing, load-balancing, rate-limiting
---

## Assign a unique `Key` property to routes used in aggregation

Assign a unique `Key` property to routes used in aggregation: and define aggregates referencing those keys, rather than building a custom controller that calls multiple services, because Ocelot executes aggregated requests in parallel and combines results with a single upstream response.
