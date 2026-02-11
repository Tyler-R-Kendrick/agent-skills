---
title: "Test WASM builds with reduced asset resolution and polygon counts"
impact: MEDIUM
impactDescription: "general best practice"
tags: wave-engine, dotnet, ui, building-2d-and-3d-games, simulations, and-interactive-3d-applications-using-the-wave-engine-evergine-with-c-use-when-you-need-a-component-based-game-engine-with-net-integration
---

## Test WASM builds with reduced asset resolution and polygon counts

Test WASM builds with reduced asset resolution and polygon counts: because WebAssembly does not support multithreaded rendering; high-poly scenes that run at 60 FPS on desktop may drop below 15 FPS in the browser, requiring LOD (Level of Detail) strategies specific to the WASM target.
