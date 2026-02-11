---
title: "Use `HasPrecision(18, 2)` on all `decimal` properties in..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: entity-framework-core, dotnet, data, crud-data-access-with-linq, database-migrations, change-tracking
---

## Use `HasPrecision(18, 2)` on all `decimal` properties in...

Use `HasPrecision(18, 2)` on all `decimal` properties in `OnModelCreating` to avoid silent precision loss when mapping to database column types.
