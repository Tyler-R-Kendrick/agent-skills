---
title: "Use `AssetsService` to load textures, models, and audio assets by asset ID"
impact: MEDIUM
impactDescription: "general best practice"
tags: wave-engine, dotnet, ui, building-2d-and-3d-games, simulations, and-interactive-3d-applications-using-the-wave-engine-evergine-with-c-use-when-you-need-a-component-based-game-engine-with-net-integration
---

## Use `AssetsService` to load textures, models, and audio assets by asset ID

Use `AssetsService` to load textures, models, and audio assets by asset ID: rather than file paths, because asset IDs are stable across content pipeline rebuilds and support platform-specific asset variants; file-path loading bypasses the content pipeline and may fail on non-desktop platforms.
