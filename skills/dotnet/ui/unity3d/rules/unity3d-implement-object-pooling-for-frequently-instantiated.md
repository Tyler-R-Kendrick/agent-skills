---
title: "Implement object pooling for frequently instantiated/destroyed objects"
impact: MEDIUM
impactDescription: "general best practice"
tags: unity3d, dotnet, ui, building-2d-and-3d-games, simulations, arvr-experiences
---

## Implement object pooling for frequently instantiated/destroyed objects

(bullets, particles, UI popups) using a `Queue<GameObject>` pattern, because `Instantiate()` and `Destroy()` allocate and deallocate managed and native memory, triggering GC spikes that cause visible frame stutters on mobile.
