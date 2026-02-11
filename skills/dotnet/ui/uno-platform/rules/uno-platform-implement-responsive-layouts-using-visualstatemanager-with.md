---
title: "Implement responsive layouts using `VisualStateManager` with `AdaptiveTrigger` breakpoints"
impact: MEDIUM
impactDescription: "general best practice"
tags: uno-platform, dotnet, ui, building-cross-platform-applications-with-winuixaml-and-c-that-target-web-webassembly, ios, android
---

## Implement responsive layouts using `VisualStateManager` with `AdaptiveTrigger` breakpoints

(e.g., `MinWindowWidth="720"`) rather than checking `Window.Current.Bounds` in code-behind, because visual states are declarative, designer-visible, and work consistently across WASM, mobile, and desktop.
