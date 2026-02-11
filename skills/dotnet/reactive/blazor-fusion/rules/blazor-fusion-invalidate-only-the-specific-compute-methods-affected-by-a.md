---
title: "Invalidate only the specific compute methods affected by a mutation"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: blazor-fusion, dotnet, reactive, building-blazor-applications-with-real-time-state-synchronization-using-stlfusion-computed-observables, automatic-invalidation, and-server-to-client-state-replication
---

## Invalidate only the specific compute methods affected by a mutation

Invalidate only the specific compute methods affected by a mutation: rather than invalidating broadly; for example, when updating a single product, invalidate `GetByIdAsync(productId)` and `GetAllAsync()` but not unrelated compute methods.
