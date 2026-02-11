---
title: "Use `KeyFrame` animations sparingly on mobile and WASM"
impact: MEDIUM
impactDescription: "general best practice"
tags: avalonia, dotnet, ui, building-cross-platform-desktop-and-mobile-applications-with-xaml-based-ui-using-avalonia-on-net-use-when-targeting-windows, macos, linux
---

## Use `KeyFrame` animations sparingly on mobile and WASM

Use `KeyFrame` animations sparingly on mobile and WASM: and measure frame rate with the built-in `PerformanceOverlay` diagnostic; Skia software rendering on lower-end devices can drop below 30 FPS with complex storyboard animations.
