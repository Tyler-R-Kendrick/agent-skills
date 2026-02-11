---
title: "Cache frequently used objects like `Vector2`, `Rectangle`, and `Color` as struct fields"
impact: MEDIUM
impactDescription: "general best practice"
tags: monogame, dotnet, ui, building-2d-and-3d-games-with-c-using-the-monogame-framework-use-when-creating-cross-platform-games-for-windows, macos, linux
---

## Cache frequently used objects like `Vector2`, `Rectangle`, and `Color` as struct fields

Cache frequently used objects like `Vector2`, `Rectangle`, and `Color` as struct fields: rather than allocating them per frame inside `Update` or `Draw`; allocating reference types every frame increases garbage collection pressure, which causes frame-rate hitches on mobile platforms.
