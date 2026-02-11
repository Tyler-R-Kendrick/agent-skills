---
title: "Keep `DbContext` lifetime scoped to the request (the..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: entity-framework-core, dotnet, data, crud-data-access-with-linq, database-migrations, change-tracking
---

## Keep `DbContext` lifetime scoped to the request (the...

Keep `DbContext` lifetime scoped to the request (the default with `AddDbContext`) and never register it as a singleton, which causes concurrency issues.
