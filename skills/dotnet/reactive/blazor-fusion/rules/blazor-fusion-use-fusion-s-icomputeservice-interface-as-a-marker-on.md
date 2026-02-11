---
title: "Use Fusion's `IComputeService` interface as a marker on service interfaces"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazor-fusion, dotnet, reactive, building-blazor-applications-with-real-time-state-synchronization-using-stlfusion-computed-observables, automatic-invalidation, and-server-to-client-state-replication
---

## Use Fusion's `IComputeService` interface as a marker on service interfaces

Use Fusion's `IComputeService` interface as a marker on service interfaces: to enable the Fusion DI extensions to register the proxy wrapper automatically during `AddService<TInterface, TImplementation>()`.
