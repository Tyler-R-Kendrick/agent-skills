---
name: orleans
description: Guidance for Orleans usage. Use when working with orleans.
license: MIT
metadata:
  displayName: "Orleans"
  author: "Tyler-R-Kendrick"
---

# Orleans

## Overview
Use Orleans for distributed actor workloads and stateful services.

## Setup
```csharp
var builder = Host.CreateApplicationBuilder(args);

builder.Host.UseOrleans(silo =>
{
	silo.UseLocalhostClustering();
});
```

## Guidance
- Keep grains small and focused on a single responsibility.
- Use reminders and timers for background workflows.