---
title: "Pin the Avalonia NuGet package versions across all projects using a `Directory.Packages.props` file"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: avalonia, dotnet, ui, building-cross-platform-desktop-and-mobile-applications-with-xaml-based-ui-using-avalonia-on-net-use-when-targeting-windows, macos, linux
---

## Pin the Avalonia NuGet package versions across all projects using a `Directory.Packages.props` file

Pin the Avalonia NuGet package versions across all projects using a `Directory.Packages.props` file: with central package management enabled, avoiding version skew between `Avalonia`, `Avalonia.Desktop`, and `Avalonia.Themes.Fluent` that causes runtime `TypeLoadException` errors.
