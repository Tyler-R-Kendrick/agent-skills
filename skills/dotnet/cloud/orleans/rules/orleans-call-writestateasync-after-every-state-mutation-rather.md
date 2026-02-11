---
title: "Call `WriteStateAsync()` after every state mutation rather..."
impact: MEDIUM
impactDescription: "general best practice"
tags: orleans, dotnet, cloud, distributed-virtual-actor-systems, per-entity-stateful-services-iot-devices, user-sessions
---

## Call `WriteStateAsync()` after every state mutation rather...

Call `WriteStateAsync()` after every state mutation rather than batching writes, because a silo crash between mutations would lose uncommitted changes.
