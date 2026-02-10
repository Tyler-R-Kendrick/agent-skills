---
description: Guidance for MediatR usage.
metadata:
  displayName: MediatR
---

# MediatR

## Overview
Use MediatR for in-process request/response and notifications.

## Example
```csharp
builder.Services.AddMediatR(cfg =>
	cfg.RegisterServicesFromAssemblyContaining<Program>());
```

## Guidance
- Keep handlers thin and single-purpose.
- Use pipeline behaviors only for cross-cutting concerns.
