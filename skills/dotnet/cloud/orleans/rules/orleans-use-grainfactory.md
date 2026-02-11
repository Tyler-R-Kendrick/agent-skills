---
title: "Use `GrainFactory"
impact: MEDIUM
impactDescription: "general best practice"
tags: orleans, dotnet, cloud, distributed-virtual-actor-systems, per-entity-stateful-services-iot-devices, user-sessions
---

## Use `GrainFactory

Use `GrainFactory.GetGrain<T>(key)` inside grains to call other grains rather than injecting them; Orleans handles activation, routing, and lifecycle automatically.
