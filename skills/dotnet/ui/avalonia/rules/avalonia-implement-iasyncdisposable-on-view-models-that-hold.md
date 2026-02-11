---
title: "Implement `IAsyncDisposable` on view models that hold subscriptions or open connections"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: avalonia, dotnet, ui, building-cross-platform-desktop-and-mobile-applications-with-xaml-based-ui-using-avalonia-on-net-use-when-targeting-windows, macos, linux
---

## Implement `IAsyncDisposable` on view models that hold subscriptions or open connections

Implement `IAsyncDisposable` on view models that hold subscriptions or open connections: and call `DisposeAsync` in the window's `OnClosed` override or via a behavior, preventing resource leaks across navigation events.
