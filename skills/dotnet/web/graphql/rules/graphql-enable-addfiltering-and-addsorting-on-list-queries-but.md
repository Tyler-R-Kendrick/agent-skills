---
title: "Enable `AddFiltering()` and `AddSorting()` on list queries but restrict the filterable/sortable fields"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: graphql, dotnet, web, building-graphql-apis-in-net-using-hot-chocolate-use-when-clients-need-flexible-query-capabilities, field-selection, and-efficient-data-fetching-across-related-entities-without-over-fetching-or-under-fetching
---

## Enable `AddFiltering()` and `AddSorting()` on list queries but restrict the filterable/sortable fields

Enable `AddFiltering()` and `AddSorting()` on list queries but restrict the filterable/sortable fields: using `[UseFiltering(typeof(ProductFilterType))]` with a custom filter type, to prevent clients from filtering on expensive computed columns or sensitive fields like `PasswordHash`.
