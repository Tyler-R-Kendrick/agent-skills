---
title: "Use `UseLocalhostClustering()` and..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: orleans, dotnet, cloud, distributed-virtual-actor-systems, per-entity-stateful-services-iot-devices, user-sessions
---

## Use `UseLocalhostClustering()` and...

Use `UseLocalhostClustering()` and `AddMemoryGrainStorage()` only for development; switch to `UseAzureStorageClustering()` or `UseAdoNetClustering()` for production multi-silo deployments.
