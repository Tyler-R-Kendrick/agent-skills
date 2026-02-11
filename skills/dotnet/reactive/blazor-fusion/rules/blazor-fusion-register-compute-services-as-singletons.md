---
title: "Register compute services as singletons"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazor-fusion, dotnet, reactive, building-blazor-applications-with-real-time-state-synchronization-using-stlfusion-computed-observables, automatic-invalidation, and-server-to-client-state-replication
---

## Register compute services as singletons

Register compute services as singletons: because Fusion caches computed results per-service-instance; transient or scoped registrations create new instances that bypass the cache and invalidation graph.
