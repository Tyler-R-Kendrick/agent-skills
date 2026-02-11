---
title: "Do not throw exceptions from compute methods to signal \"not found\""
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: blazor-fusion, dotnet, reactive, building-blazor-applications-with-real-time-state-synchronization-using-stlfusion-computed-observables, automatic-invalidation, and-server-to-client-state-replication
---

## Do not throw exceptions from compute methods to signal "not found"

Do not throw exceptions from compute methods to signal "not found": return `null` or empty collections instead, because exceptions bypass the computed cache and force recomputation on every access.
