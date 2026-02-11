---
title: "Register pages and view models as `Transient` in `MauiProgram.cs` and use constructor injection"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: maui, dotnet, ui, building-cross-platform-native-mobile-and-desktop-applications-with-net-maui-targeting-ios, android, windows
---

## Register pages and view models as `Transient` in `MauiProgram.cs` and use constructor injection

Register pages and view models as `Transient` in `MauiProgram.cs` and use constructor injection: rather than `BindingContext = new ViewModel()` in code-behind, because transient registration ensures each page navigation creates a fresh view model with properly initialized dependencies.
