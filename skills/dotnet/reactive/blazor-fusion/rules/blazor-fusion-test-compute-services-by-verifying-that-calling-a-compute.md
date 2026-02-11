---
title: "Test compute services by verifying that calling a compute method twice returns the same cached instance"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazor-fusion, dotnet, reactive, building-blazor-applications-with-real-time-state-synchronization-using-stlfusion-computed-observables, automatic-invalidation, and-server-to-client-state-replication
---

## Test compute services by verifying that calling a compute method twice returns the same cached instance

Test compute services by verifying that calling a compute method twice returns the same cached instance: and that invalidation causes the next call to return a fresh value, ensuring the caching and invalidation graph works correctly.
