---
title: "Inherit from `ComputedStateComponent<T>` for Blazor components that consume compute methods"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: blazor-fusion, dotnet, reactive, building-blazor-applications-with-real-time-state-synchronization-using-stlfusion-computed-observables, automatic-invalidation, and-server-to-client-state-replication
---

## Inherit from `ComputedStateComponent<T>` for Blazor components that consume compute methods

Inherit from `ComputedStateComponent<T>` for Blazor components that consume compute methods: rather than calling compute methods directly in `OnInitializedAsync`, so that the component automatically re-renders when the computed value is invalidated.
