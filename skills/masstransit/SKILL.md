---
description: Guidance for MassTransit usage.
metadata:
  displayName: MassTransit
---

# MassTransit

## Overview
Use MassTransit for message-based integration and sagas in .NET.

## Example
```csharp
builder.Services.AddMassTransit(cfg =>
{
	cfg.AddConsumer<OrderSubmittedConsumer>();
	cfg.UsingInMemory((context, bus) => bus.ConfigureEndpoints(context));
});
```

## Guidance
- Use outbox patterns for transactional publishing.
- Keep consumers focused and idempotent.
