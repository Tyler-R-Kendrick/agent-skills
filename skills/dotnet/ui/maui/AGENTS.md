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