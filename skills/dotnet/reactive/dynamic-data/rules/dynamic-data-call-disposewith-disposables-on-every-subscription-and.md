---
title: "Call `.DisposeWith(disposables)` on every subscription and dispose the `CompositeDisposable` in the view model's `Dispose` method"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dynamic-data, dotnet, reactive, reactive-collection-management-using-observable-caches-and-lists-with-linq-style-operators-for-filtering, sorting, grouping
---

## Call `.DisposeWith(disposables)` on every subscription and dispose the `CompositeDisposable` in the view model's `Dispose` method

Call `.DisposeWith(disposables)` on every subscription and dispose the `CompositeDisposable` in the view model's `Dispose` method: to prevent memory leaks from long-lived subscriptions that hold references to the source cache.
