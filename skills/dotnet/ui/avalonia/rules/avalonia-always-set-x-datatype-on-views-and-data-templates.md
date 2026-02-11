---
title: "Always set `x:DataType` on views and data templates"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: avalonia, dotnet, ui, building-cross-platform-desktop-and-mobile-applications-with-xaml-based-ui-using-avalonia-on-net-use-when-targeting-windows, macos, linux
---

## Always set `x:DataType` on views and data templates

Always set `x:DataType` on views and data templates: to enable compiled bindings, which provide compile-time type checking and eliminate reflection-based binding overhead that degrades performance on mobile and WASM targets.
