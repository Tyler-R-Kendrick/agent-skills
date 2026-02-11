---
title: "Keep the `SourceCache` as a private field in the view model and expose only `IObservableCollection<T>` to the view"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dynamic-data, dotnet, reactive, reactive-collection-management-using-observable-caches-and-lists-with-linq-style-operators-for-filtering, sorting, grouping
---

## Keep the `SourceCache` as a private field in the view model and expose only `IObservableCollection<T>` to the view

Keep the `SourceCache` as a private field in the view model and expose only `IObservableCollection<T>` to the view: to enforce unidirectional data flow where mutations go through view model methods and the UI only reads the bound collection.
