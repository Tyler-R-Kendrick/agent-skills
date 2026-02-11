---
title: "Apply `ObserveOn(RxApp.MainThreadScheduler)` before `.Bind()`"
impact: MEDIUM
impactDescription: "general best practice"
tags: dynamic-data, dotnet, reactive, reactive-collection-management-using-observable-caches-and-lists-with-linq-style-operators-for-filtering, sorting, grouping
---

## Apply `ObserveOn(RxApp.MainThreadScheduler)` before `.Bind()`

Apply `ObserveOn(RxApp.MainThreadScheduler)` before `.Bind()`: to marshal change set notifications to the UI thread; binding on a background thread causes cross-thread access exceptions in WPF, MAUI, and WinUI.
