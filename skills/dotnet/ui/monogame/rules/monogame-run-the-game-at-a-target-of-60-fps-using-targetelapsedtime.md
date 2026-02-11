---
title: "Run the game at a target of 60 FPS using `TargetElapsedTime = TimeSpan.FromSeconds(1.0 / 60.0)` with `IsFixedTimeStep = true`"
impact: MEDIUM
impactDescription: "general best practice"
tags: monogame, dotnet, ui, building-2d-and-3d-games-with-c-using-the-monogame-framework-use-when-creating-cross-platform-games-for-windows, macos, linux
---

## Run the game at a target of 60 FPS using `TargetElapsedTime = TimeSpan.FromSeconds(1.0 / 60.0)` with `IsFixedTimeStep = true`

Run the game at a target of 60 FPS using `TargetElapsedTime = TimeSpan.FromSeconds(1.0 / 60.0)` with `IsFixedTimeStep = true`: and measure frame time with `gameTime.IsRunningSlowly` to detect performance regressions; when `IsRunningSlowly` is true, reduce particle counts or skip non-essential visual effects to maintain a stable frame rate.
