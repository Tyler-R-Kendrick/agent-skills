---
title: "Use `Vector3.Normalize()` on movement direction vectors before multiplying by speed"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: wave-engine, dotnet, ui, building-2d-and-3d-games, simulations, and-interactive-3d-applications-using-the-wave-engine-evergine-with-c-use-when-you-need-a-component-based-game-engine-with-net-integration
---

## Use `Vector3.Normalize()` on movement direction vectors before multiplying by speed

Use `Vector3.Normalize()` on movement direction vectors before multiplying by speed: to ensure diagonal movement (W+D) does not produce faster movement than cardinal directions; unnormalized diagonal vectors have magnitude ~1.414, resulting in 41% faster diagonal speed.
