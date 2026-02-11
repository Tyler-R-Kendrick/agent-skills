---
title: "Unsubscribe from events (collision, input, custom events) in `OnDetach()`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: wave-engine, dotnet, ui, building-2d-and-3d-games, simulations, and-interactive-3d-applications-using-the-wave-engine-evergine-with-c-use-when-you-need-a-component-based-game-engine-with-net-integration
---

## Unsubscribe from events (collision, input, custom events) in `OnDetach()`

Unsubscribe from events (collision, input, custom events) in `OnDetach()`: to prevent memory leaks and callback invocations on destroyed components; Evergine does not automatically unsubscribe event handlers when entities are removed from the scene.
