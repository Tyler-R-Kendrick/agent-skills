---
title: "Configure `AppBuilder.UsePlatformDetect()` explicitly per target"
impact: MEDIUM
impactDescription: "general best practice"
tags: avalonia, dotnet, ui, building-cross-platform-desktop-and-mobile-applications-with-xaml-based-ui-using-avalonia-on-net-use-when-targeting-windows, macos, linux
---

## Configure `AppBuilder.UsePlatformDetect()` explicitly per target

Configure `AppBuilder.UsePlatformDetect()` explicitly per target: in CI pipelines (e.g., `.UseX11()` on Linux, `.UseAvaloniaNative()` on macOS) so build failures surface immediately instead of falling back silently to an unsupported backend.
