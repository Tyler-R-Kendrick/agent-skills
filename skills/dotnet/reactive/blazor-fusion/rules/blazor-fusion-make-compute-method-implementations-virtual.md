---
title: "Make compute method implementations `virtual`"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazor-fusion, dotnet, reactive, building-blazor-applications-with-real-time-state-synchronization-using-stlfusion-computed-observables, automatic-invalidation, and-server-to-client-state-replication
---

## Make compute method implementations `virtual`

Make compute method implementations `virtual`: because Fusion uses Castle.DynamicProxy to intercept method calls and manage the computed cache; non-virtual methods bypass the proxy and produce stale data.
