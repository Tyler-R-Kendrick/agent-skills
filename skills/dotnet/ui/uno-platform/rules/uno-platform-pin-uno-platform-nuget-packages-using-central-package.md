---
title: "Pin Uno Platform NuGet packages using central package management (`Directory.Packages.props`)"
impact: MEDIUM
impactDescription: "general best practice"
tags: uno-platform, dotnet, ui, building-cross-platform-applications-with-winuixaml-and-c-that-target-web-webassembly, ios, android
---

## Pin Uno Platform NuGet packages using central package management (`Directory.Packages.props`)

Pin Uno Platform NuGet packages using central package management (`Directory.Packages.props`): because Uno packages (`Uno.WinUI`, `Uno.Extensions.Navigation`, `Uno.Toolkit.UI`) share internal contracts; mixing versions causes `TypeLoadException` or missing method errors at runtime on specific platform targets.
