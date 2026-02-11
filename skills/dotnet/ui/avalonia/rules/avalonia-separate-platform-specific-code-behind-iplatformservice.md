---
title: "Separate platform-specific code behind `IPlatformService` abstractions"
impact: MEDIUM
impactDescription: "general best practice"
tags: avalonia, dotnet, ui, building-cross-platform-desktop-and-mobile-applications-with-xaml-based-ui-using-avalonia-on-net-use-when-targeting-windows, macos, linux
---

## Separate platform-specific code behind `IPlatformService` abstractions

Separate platform-specific code behind `IPlatformService` abstractions: registered per-platform in the DI container rather than using `#if` preprocessor directives, so that shared view models remain testable without platform dependencies.
