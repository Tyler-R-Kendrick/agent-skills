---
title: "Register Uno extensions (`UseNavigation`, `UseConfiguration`, `UseLocalization`) via the `IHostBuilder` in `App.xaml.cs`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: uno-platform, dotnet, ui, building-cross-platform-applications-with-winuixaml-and-c-that-target-web-webassembly, ios, android
---

## Register Uno extensions (`UseNavigation`, `UseConfiguration`, `UseLocalization`) via the `IHostBuilder` in `App.xaml.cs`

Register Uno extensions (`UseNavigation`, `UseConfiguration`, `UseLocalization`) via the `IHostBuilder` in `App.xaml.cs`: and inject services through constructor injection in view models; avoid using `ServiceLocator` or `Application.Current.Resources` to resolve dependencies, as these patterns defeat testability.
