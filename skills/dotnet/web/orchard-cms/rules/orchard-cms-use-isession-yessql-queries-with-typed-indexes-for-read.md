---
title: "Use `ISession` (YesSql) queries with typed indexes for read operations"
impact: MEDIUM
impactDescription: "general best practice"
tags: orchard-cms, dotnet, web, building-modular-content-managed-web-applications-with-orchard-core-use-when-you-need-a-multi-tenant-cms-with-content-types, custom-modules, workflows
---

## Use `ISession` (YesSql) queries with typed indexes for read operations

Use `ISession` (YesSql) queries with typed indexes for read operations: and `IContentManager` for create/update/publish operations, because `IContentManager` triggers content handlers and workflows while `ISession` provides efficient read-only querying with index support.
