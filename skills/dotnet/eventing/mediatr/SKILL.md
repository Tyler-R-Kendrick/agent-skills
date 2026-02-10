---
name: mediatr
description: Guidance for MediatR usage. Use when working with mediatr.
license: MIT
metadata:
  displayName: "MediatR"
  author: "Tyler-R-Kendrick"
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