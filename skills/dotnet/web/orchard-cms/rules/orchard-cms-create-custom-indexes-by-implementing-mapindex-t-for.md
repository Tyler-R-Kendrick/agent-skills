---
title: "Create custom indexes by implementing `MapIndex<T>` for frequently queried fields"
impact: MEDIUM
impactDescription: "general best practice"
tags: orchard-cms, dotnet, web, building-modular-content-managed-web-applications-with-orchard-core-use-when-you-need-a-multi-tenant-cms-with-content-types, custom-modules, workflows
---

## Create custom indexes by implementing `MapIndex<T>` for frequently queried fields

(event dates, product SKUs, author names) rather than deserializing full content items and filtering in memory, because YesSql indexes are stored in relational tables with proper SQL indexes for fast lookups.
