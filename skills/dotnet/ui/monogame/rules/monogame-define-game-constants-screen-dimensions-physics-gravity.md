---
title: "Define game constants (screen dimensions, physics gravity, spawn rates) in a static `GameConfig` class or load from JSON"
impact: MEDIUM
impactDescription: "general best practice"
tags: monogame, dotnet, ui, building-2d-and-3d-games-with-c-using-the-monogame-framework-use-when-creating-cross-platform-games-for-windows, macos, linux
---

## Define game constants (screen dimensions, physics gravity, spawn rates) in a static `GameConfig` class or load from JSON

Define game constants (screen dimensions, physics gravity, spawn rates) in a static `GameConfig` class or load from JSON: rather than scattering magic numbers through `Update` and `Draw` methods, enabling runtime tuning during development without recompilation.
