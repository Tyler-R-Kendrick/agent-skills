---
title: "Use the `[BindComponent]` attribute to declare component dependencies"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: wave-engine, dotnet, ui, building-2d-and-3d-games, simulations, and-interactive-3d-applications-using-the-wave-engine-evergine-with-c-use-when-you-need-a-component-based-game-engine-with-net-integration
---

## Use the `[BindComponent]` attribute to declare component dependencies

Use the `[BindComponent]` attribute to declare component dependencies: rather than calling `Owner.FindComponent<T>()` at runtime, because `[BindComponent]` is resolved during entity attachment and throws a clear error if the dependency is missing, preventing null reference exceptions during `Update`.
