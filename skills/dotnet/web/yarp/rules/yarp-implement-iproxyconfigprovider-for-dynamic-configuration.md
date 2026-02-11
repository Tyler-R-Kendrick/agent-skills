---
title: "Implement `IProxyConfigProvider` for dynamic configuration"
impact: MEDIUM
impactDescription: "general best practice"
tags: yarp, dotnet, web, building-high-performance-reverse-proxies, api-gateways, and-load-balancers-using-yarp-yet-another-reverse-proxy-from-microsoft-use-when-you-need-customizable-request-routing
---

## Implement `IProxyConfigProvider` for dynamic configuration

Implement `IProxyConfigProvider` for dynamic configuration: from databases, service registries, or APIs when routes and clusters change at runtime, calling `SignalChange()` on the `CancellationChangeToken` to notify YARP of configuration updates without restarting the application.
