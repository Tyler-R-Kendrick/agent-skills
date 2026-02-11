---
title: "Separate game state updates from rendering by keeping all mutation in `Update` and all draw calls in `Draw`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: monogame, dotnet, ui, building-2d-and-3d-games-with-c-using-the-monogame-framework-use-when-creating-cross-platform-games-for-windows, macos, linux
---

## Separate game state updates from rendering by keeping all mutation in `Update` and all draw calls in `Draw`

, never modifying entity positions or game state inside `Draw`; MonoGame may skip `Draw` calls under heavy load but always calls `Update` at the fixed timestep rate.
