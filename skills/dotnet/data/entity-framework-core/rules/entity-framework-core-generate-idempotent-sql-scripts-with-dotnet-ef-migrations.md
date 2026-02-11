---
title: "Generate idempotent SQL scripts with `dotnet ef migrations..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: entity-framework-core, dotnet, data, crud-data-access-with-linq, database-migrations, change-tracking
---

## Generate idempotent SQL scripts with `dotnet ef migrations...

Generate idempotent SQL scripts with `dotnet ef migrations script --idempotent` for production deployments rather than calling `Database.MigrateAsync()` at startup.
