---
name: entity-framework-core
description: Guidance for Entity Framework Core usage. Use when working with entity framework core.
license: MIT
metadata:
  displayName: "Entity Framework Core"
  author: "Tyler-R-Kendrick"
---

# Entity Framework Core

## Overview
Use EF Core for most data access with migrations and a per-request `DbContext`.

## Setup
```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
```

## Example
```csharp
public sealed class CatalogStore(AppDbContext db)
{
	public Task<Item?> FindAsync(Guid id, CancellationToken ct)
		=> db.Items.FindAsync([id], ct).AsTask();
}
```

## Guidance
- Keep `DbContext` scoped to the request.
- Use migrations for schema changes.