---
title: "Use `[UseProjection]` on every query that returns `IQueryable<T>`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: graphql, dotnet, web, building-graphql-apis-in-net-using-hot-chocolate-use-when-clients-need-flexible-query-capabilities, field-selection, and-efficient-data-fetching-across-related-entities-without-over-fetching-or-under-fetching
---

## Use `[UseProjection]` on every query that returns `IQueryable<T>`

Use `[UseProjection]` on every query that returns `IQueryable<T>`: so that Hot Chocolate generates SQL `SELECT` statements containing only the fields requested by the client, preventing full-table reads when the client queries only `id` and `name` from an entity with 20 columns.
