---
title: "Use `[PersistentState(\"name\", \"storage\")]` constructor..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: orleans, dotnet, cloud, distributed-virtual-actor-systems, per-entity-stateful-services-iot-devices, user-sessions
---

## Use `[PersistentState("name", "storage")]` constructor...

Use `[PersistentState("name", "storage")]` constructor injection for grain state rather than inheriting from `Grain<TState>`, which provides more flexibility and supports multiple state objects per grain.
