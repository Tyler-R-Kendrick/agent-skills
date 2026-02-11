---
title: "Use `DistinctValues(e => e.Category)` to extract unique property values for filter dropdowns"
impact: MEDIUM
impactDescription: "general best practice"
tags: dynamic-data, dotnet, reactive, reactive-collection-management-using-observable-caches-and-lists-with-linq-style-operators-for-filtering, sorting, grouping
---

## Use `DistinctValues(e => e.Category)` to extract unique property values for filter dropdowns

Use `DistinctValues(e => e.Category)` to extract unique property values for filter dropdowns: rather than manually tracking categories, so the dropdown automatically updates when items with new categories are added.
