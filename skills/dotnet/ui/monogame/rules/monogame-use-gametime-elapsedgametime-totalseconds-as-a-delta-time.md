---
title: "Use `gameTime.ElapsedGameTime.TotalSeconds` as a delta-time multiplier for all movement and animation"
impact: MEDIUM
impactDescription: "general best practice"
tags: monogame, dotnet, ui, building-2d-and-3d-games-with-c-using-the-monogame-framework-use-when-creating-cross-platform-games-for-windows, macos, linux
---

## Use `gameTime.ElapsedGameTime.TotalSeconds` as a delta-time multiplier for all movement and animation

Use `gameTime.ElapsedGameTime.TotalSeconds` as a delta-time multiplier for all movement and animation: instead of assuming a fixed 1/60th-second tick, so that gameplay remains consistent even when `IsFixedTimeStep` is `false` or the game runs on a 120Hz display.
