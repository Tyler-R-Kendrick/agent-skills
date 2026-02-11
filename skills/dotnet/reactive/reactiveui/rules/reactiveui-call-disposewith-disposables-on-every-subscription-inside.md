---
title: "Call `.DisposeWith(disposables)` on every subscription inside `WhenActivated`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: reactiveui, dotnet, reactive, building-mvvm-applications-using-reactive-extensions-with-reactiveobject, whenanyvalue, reactivecommand
---

## Call `.DisposeWith(disposables)` on every subscription inside `WhenActivated`

Call `.DisposeWith(disposables)` on every subscription inside `WhenActivated`: to ensure subscriptions are cleaned up when the view is deactivated, preventing memory leaks and stale data updates.
