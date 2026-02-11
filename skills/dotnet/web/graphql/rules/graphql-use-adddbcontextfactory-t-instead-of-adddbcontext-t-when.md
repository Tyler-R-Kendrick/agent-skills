---
title: "Use `AddDbContextFactory<T>()` instead of `AddDbContext<T>()` when using DataLoaders"
impact: MEDIUM
impactDescription: "general best practice"
tags: graphql, dotnet, web, building-graphql-apis-in-net-using-hot-chocolate-use-when-clients-need-flexible-query-capabilities, field-selection, and-efficient-data-fetching-across-related-entities-without-over-fetching-or-under-fetching
---

## Use `AddDbContextFactory<T>()` instead of `AddDbContext<T>()` when using DataLoaders

Use `AddDbContextFactory<T>()` instead of `AddDbContext<T>()` when using DataLoaders: because DataLoaders outlive the HTTP request scope and hold references to scoped services; `IDbContextFactory` creates short-lived `DbContext` instances per batch that are disposed after use.
