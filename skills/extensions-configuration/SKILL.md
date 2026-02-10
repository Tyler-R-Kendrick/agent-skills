---
description: Guidance for Microsoft.Extensions.Configuration.
metadata:
  displayName: Configuration
---

# Configuration

## Overview
Use `IConfiguration` with JSON, environment variables, and user secrets.

## Example
```csharp
builder.Configuration
	.AddJsonFile("appsettings.json", optional: false)
	.AddEnvironmentVariables();

builder.Services.Configure<MyOptions>(
	builder.Configuration.GetSection("MyOptions"));
```

## Guidance
- Bind options with validation when possible.
- Avoid reading config directly in business logic.
