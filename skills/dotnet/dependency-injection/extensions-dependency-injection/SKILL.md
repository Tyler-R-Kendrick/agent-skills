---
name: extensions-dependency-injection
description: Guidance for Microsoft.Extensions.DependencyInjection. Use when working with extensions dependency injection.
license: MIT
metadata:
  displayName: "Dependency Injection"
  author: "Tyler-R-Kendrick"
---

# Dependency Injection

## Overview
Use the built-in DI container for service registration and resolution.

## Example
```csharp
public static class ServiceCollectionExtensions
{
	public static IServiceCollection AddAppServices(this IServiceCollection services)
	{
		services.AddSingleton<ISystemClock, SystemClock>();
		services.AddScoped<IMyService, MyService>();
		services.AddTransient<IUserSettingsStore, IsolatedStorageUserSettingsStore>();
		return services;
	}
}
```

## Guidance
- Keep registrations in extension methods.
- Choose lifetimes to match state and dependencies.