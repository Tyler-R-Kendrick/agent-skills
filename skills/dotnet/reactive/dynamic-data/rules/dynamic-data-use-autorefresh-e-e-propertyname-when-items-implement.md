---
title: "Use `AutoRefresh(e => e.PropertyName)` when items implement `INotifyPropertyChanged` and a filter or sort depends on a mutable property"
impact: MEDIUM
impactDescription: "general best practice"
tags: dynamic-data, dotnet, reactive, reactive-collection-management-using-observable-caches-and-lists-with-linq-style-operators-for-filtering, sorting, grouping
---

## Use `AutoRefresh(e => e.PropertyName)` when items implement `INotifyPropertyChanged` and a filter or sort depends on a mutable property

Use `AutoRefresh(e => e.PropertyName)` when items implement `INotifyPropertyChanged` and a filter or sort depends on a mutable property: so that the operator re-evaluates when the property changes, not only when items are added or removed.
