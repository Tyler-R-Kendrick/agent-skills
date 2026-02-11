---
title: "Keep `Update()` methods lightweight by offloading expensive computations"
impact: MEDIUM
impactDescription: "general best practice"
tags: wave-engine, dotnet, ui, building-2d-and-3d-games, simulations, and-interactive-3d-applications-using-the-wave-engine-evergine-with-c-use-when-you-need-a-component-based-game-engine-with-net-integration
---

## Keep `Update()` methods lightweight by offloading expensive computations

(pathfinding, AI decision trees, procedural generation) to background tasks or spread them across multiple frames using state machines, because `Update()` runs on the main thread and blocks rendering.
