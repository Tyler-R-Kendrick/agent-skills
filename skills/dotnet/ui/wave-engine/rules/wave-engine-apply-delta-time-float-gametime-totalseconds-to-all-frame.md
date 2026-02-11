---
title: "Apply delta time (`(float)gameTime.TotalSeconds`) to all frame-dependent calculations"
impact: MEDIUM
impactDescription: "general best practice"
tags: wave-engine, dotnet, ui, building-2d-and-3d-games, simulations, and-interactive-3d-applications-using-the-wave-engine-evergine-with-c-use-when-you-need-a-component-based-game-engine-with-net-integration
---

## Apply delta time (`(float)gameTime.TotalSeconds`) to all frame-dependent calculations

(movement, rotation, timer countdowns) in `Update()`, so behavior remains consistent across different frame rates and hardware; hardcoding per-frame increments causes gameplay speed to vary with FPS.
