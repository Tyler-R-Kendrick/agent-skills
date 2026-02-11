---
title: "Avoid blocking calls or `Task"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: orleans, dotnet, cloud, distributed-virtual-actor-systems, per-entity-stateful-services-iot-devices, user-sessions
---

## Avoid blocking calls or `Task

Avoid blocking calls or `Task.Result` inside grain methods because grains are single-threaded; blocking prevents other messages from being processed and can cause deadlocks.
