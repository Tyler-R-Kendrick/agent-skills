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