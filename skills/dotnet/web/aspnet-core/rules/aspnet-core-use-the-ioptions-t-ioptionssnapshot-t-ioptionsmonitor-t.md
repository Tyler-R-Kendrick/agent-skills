---
title: "Use the `IOptions<T>` / `IOptionsSnapshot<T>` / `IOptionsMonitor<T>` pattern for configuration"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: aspnet-core, dotnet, web, building-web-apis, web-applications, and-microservices-with-aspnet-core-use-for-minimal-apis
---

## Use the `IOptions<T>` / `IOptionsSnapshot<T>` / `IOptionsMonitor<T>` pattern for configuration

Use the `IOptions<T>` / `IOptionsSnapshot<T>` / `IOptionsMonitor<T>` pattern for configuration: instead of reading `IConfiguration` directly in services, because the Options pattern provides strong typing, validation via `ValidateOnStart()`, and hot-reload support for configuration changes without restarting the application.
