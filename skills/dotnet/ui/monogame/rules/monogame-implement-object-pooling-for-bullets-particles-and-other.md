---
title: "Implement object pooling for bullets, particles, and other short-lived entities"
impact: MEDIUM
impactDescription: "general best practice"
tags: monogame, dotnet, ui, building-2d-and-3d-games-with-c-using-the-monogame-framework-use-when-creating-cross-platform-games-for-windows, macos, linux
---

## Implement object pooling for bullets, particles, and other short-lived entities

Implement object pooling for bullets, particles, and other short-lived entities: using a `Queue<T>` or `Stack<T>` of pre-allocated instances, calling `Reset()` instead of `new`; `List.Add`/`Remove` patterns for hundreds of projectiles cause GC spikes visible in the frame-time profiler.
