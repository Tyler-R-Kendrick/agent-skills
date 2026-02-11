---
title: "Batch all `SpriteBatch.Draw` calls between a single `Begin`/`End` pair sorted by texture"
impact: MEDIUM
impactDescription: "general best practice"
tags: monogame, dotnet, ui, building-2d-and-3d-games-with-c-using-the-monogame-framework-use-when-creating-cross-platform-games-for-windows, macos, linux
---

## Batch all `SpriteBatch.Draw` calls between a single `Begin`/`End` pair sorted by texture

Batch all `SpriteBatch.Draw` calls between a single `Begin`/`End` pair sorted by texture: using `SpriteSortMode.Texture` to minimize GPU state changes; each `Begin`/`End` pair submits a separate draw call, and exceeding 100 draw calls per frame degrades performance on integrated GPUs.
