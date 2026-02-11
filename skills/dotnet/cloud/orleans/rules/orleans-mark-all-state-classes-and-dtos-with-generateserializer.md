---
title: "Mark all state classes and DTOs with `[GenerateSerializer]`..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: orleans, dotnet, cloud, distributed-virtual-actor-systems, per-entity-stateful-services-iot-devices, user-sessions
---

## Mark all state classes and DTOs with `[GenerateSerializer]`...

Mark all state classes and DTOs with `[GenerateSerializer]` and assign explicit `[Id(n)]` attributes to each serialized property to ensure forward-compatible serialization across deployments.
