---
title: "Override `OnAttached()` for one-time initialization that depends on the entity hierarchy"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: wave-engine, dotnet, ui, building-2d-and-3d-games, simulations, and-interactive-3d-applications-using-the-wave-engine-evergine-with-c-use-when-you-need-a-component-based-game-engine-with-net-integration
---

## Override `OnAttached()` for one-time initialization that depends on the entity hierarchy

Override `OnAttached()` for one-time initialization that depends on the entity hierarchy: and `Start()` for logic that requires the scene to be fully loaded; code in the constructor runs before the entity is added to the scene and cannot access `Owner`, `Transform3D`, or other components.
