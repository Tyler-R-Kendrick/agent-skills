---
title: "Separate mutation methods (Add, Update, Delete) from compute methods (Get, List, Count)"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazor-fusion, dotnet, reactive, building-blazor-applications-with-real-time-state-synchronization-using-stlfusion-computed-observables, automatic-invalidation, and-server-to-client-state-replication
---

## Separate mutation methods (Add, Update, Delete) from compute methods (Get, List, Count)

Separate mutation methods (Add, Update, Delete) from compute methods (Get, List, Count): on the service interface because mutations trigger invalidation while compute methods participate in the dependency graph; mixing them creates confusing invalidation cycles.
