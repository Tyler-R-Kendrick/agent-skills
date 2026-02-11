---
title: "Use Orleans Streams for event-driven communication between..."
impact: MEDIUM
impactDescription: "general best practice"
tags: orleans, dotnet, cloud, distributed-virtual-actor-systems, per-entity-stateful-services-iot-devices, user-sessions
---

## Use Orleans Streams for event-driven communication between...

Use Orleans Streams for event-driven communication between grains rather than direct grain-to-grain calls when the producer should not know about or depend on consumers.
