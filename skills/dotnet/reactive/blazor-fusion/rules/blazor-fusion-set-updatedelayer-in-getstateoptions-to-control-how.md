---
title: "Set `UpdateDelayer` in `GetStateOptions()` to control how frequently a component polls for recomputation"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: blazor-fusion, dotnet, reactive, building-blazor-applications-with-real-time-state-synchronization-using-stlfusion-computed-observables, automatic-invalidation, and-server-to-client-state-replication
---

## Set `UpdateDelayer` in `GetStateOptions()` to control how frequently a component polls for recomputation

Set `UpdateDelayer` in `GetStateOptions()` to control how frequently a component polls for recomputation: to balance responsiveness against server load; use `FixedDelayer.Get(TimeSpan.FromSeconds(1))` for dashboards and shorter intervals for critical data.
