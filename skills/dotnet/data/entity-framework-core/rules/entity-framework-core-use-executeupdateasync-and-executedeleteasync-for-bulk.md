---
title: "Use `ExecuteUpdateAsync` and `ExecuteDeleteAsync` for bulk..."
impact: MEDIUM
impactDescription: "general best practice"
tags: entity-framework-core, dotnet, data, crud-data-access-with-linq, database-migrations, change-tracking
---

## Use `ExecuteUpdateAsync` and `ExecuteDeleteAsync` for bulk...

Use `ExecuteUpdateAsync` and `ExecuteDeleteAsync` for bulk operations instead of loading entities into memory, modifying them, and calling `SaveChangesAsync`.
