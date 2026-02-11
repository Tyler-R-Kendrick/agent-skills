---
title: "Prefer `DistinctUntilChanged` over `Distinct`"
impact: LOW
impactDescription: "recommended but situational"
tags: reactive-extensions, dotnet, reactive, composing-event-streams, ui-events, timers
---

## Prefer `DistinctUntilChanged` over `Distinct`

Prefer `DistinctUntilChanged` over `Distinct`: because `DistinctUntilChanged` only compares consecutive elements (O(1) memory), while `Distinct` tracks all previously seen values (O(n) memory and unbounded for infinite streams).
