---
title: "Always use `Include` or projection (`Select`) to load..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: entity-framework-core, dotnet, data, crud-data-access-with-linq, database-migrations, change-tracking
---

## Always use `Include` or projection (`Select`) to load...

Always use `Include` or projection (`Select`) to load related data explicitly; never rely on lazy loading, which causes N+1 query problems and hides performance issues.
