---
title: "Implement `BatchDataLoader<TKey, TValue>` for every foreign key relationship"
impact: MEDIUM
impactDescription: "general best practice"
tags: graphql, dotnet, web, building-graphql-apis-in-net-using-hot-chocolate-use-when-clients-need-flexible-query-capabilities, field-selection, and-efficient-data-fetching-across-related-entities-without-over-fetching-or-under-fetching
---

## Implement `BatchDataLoader<TKey, TValue>` for every foreign key relationship

(e.g., `Product.CategoryId` to `Category`) and register it via type extensions using `[ExtendObjectType]`, so that resolving the category for 50 products results in one `WHERE Id IN (...)` query instead of 50 individual queries.
