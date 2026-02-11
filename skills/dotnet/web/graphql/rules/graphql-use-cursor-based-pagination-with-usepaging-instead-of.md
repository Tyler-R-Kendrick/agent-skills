---
title: "Use cursor-based pagination with `[UsePaging]` instead of offset-based pagination"
impact: MEDIUM
impactDescription: "general best practice"
tags: graphql, dotnet, web, building-graphql-apis-in-net-using-hot-chocolate-use-when-clients-need-flexible-query-capabilities, field-selection, and-efficient-data-fetching-across-related-entities-without-over-fetching-or-under-fetching
---

## Use cursor-based pagination with `[UsePaging]` instead of offset-based pagination

Use cursor-based pagination with `[UsePaging]` instead of offset-based pagination: for lists that may change between page loads, because cursor pagination guarantees no items are skipped or duplicated when new items are inserted; offset pagination shifts results when the underlying data changes.
