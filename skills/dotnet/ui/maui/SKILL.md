---
name: maui
description: Guidance for .NET MAUI usage. Use when working with maui.
license: MIT
metadata:
  displayName: "MAUI"
  author: "Tyler-R-Kendrick"
---

# MAUI

## Overview
Use .NET MAUI for cross-platform mobile and desktop apps.

## Example
```csharp
public static MauiApp CreateMauiApp()
{
	var builder = MauiApp.CreateBuilder();
	builder.UseMauiApp<App>();
	return builder.Build();
}
```

## Guidance
- Use MVVM or MVU patterns for clean UI logic.
- Keep platform-specific code isolated behind services.