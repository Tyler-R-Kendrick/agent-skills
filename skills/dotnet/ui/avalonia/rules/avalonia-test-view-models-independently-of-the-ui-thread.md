---
title: "Test view models independently of the UI thread"
impact: MEDIUM
impactDescription: "general best practice"
tags: avalonia, dotnet, ui, building-cross-platform-desktop-and-mobile-applications-with-xaml-based-ui-using-avalonia-on-net-use-when-targeting-windows, macos, linux
---

## Test view models independently of the UI thread

Test view models independently of the UI thread: by injecting `Avalonia.Threading.Dispatcher` behind an interface, or use `Dispatcher.UIThread.InvokeAsync` only at the view layer, keeping business logic synchronous and unit-testable.
