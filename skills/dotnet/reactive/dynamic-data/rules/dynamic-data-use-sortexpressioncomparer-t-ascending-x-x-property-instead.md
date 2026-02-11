---
title: "Use `SortExpressionComparer<T>.Ascending(x => x.Property)` instead of custom `IComparer<T>` implementations"
impact: MEDIUM
impactDescription: "general best practice"
tags: dynamic-data, dotnet, reactive, reactive-collection-management-using-observable-caches-and-lists-with-linq-style-operators-for-filtering, sorting, grouping
---

## Use `SortExpressionComparer<T>.Ascending(x => x.Property)` instead of custom `IComparer<T>` implementations

Use `SortExpressionComparer<T>.Ascending(x => x.Property)` instead of custom `IComparer<T>` implementations: because the expression-based comparer integrates with DynamicData's change-tracking and produces correct incremental sort updates.
