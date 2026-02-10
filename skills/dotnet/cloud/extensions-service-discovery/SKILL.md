---
name: extensions-service-discovery
description: Guidance for Microsoft.Extensions.ServiceDiscovery. Use when working with extensions service discovery.
license: MIT
metadata:
  displayName: "Service Discovery"
  author: "Tyler-R-Kendrick"
---

# Service Discovery

## Overview
Use `Microsoft.Extensions.ServiceDiscovery` to resolve service endpoints for HTTP clients.

## Setup
```csharp
builder.Services.AddServiceDiscovery();
```

## Example
```csharp
builder.Services.AddHttpClient("catalog")
	.AddServiceDiscovery();
```

## Guidance
- Keep discovery and resiliency in the HTTP client pipeline.
- Use named clients for clear routing.