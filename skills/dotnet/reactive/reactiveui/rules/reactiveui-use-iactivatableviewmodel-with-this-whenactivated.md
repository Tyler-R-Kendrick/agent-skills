---
title: "Use `IActivatableViewModel` with `this.WhenActivated(disposables => { ... })` for subscriptions that should only run while the view is visible"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: reactiveui, dotnet, reactive, building-mvvm-applications-using-reactive-extensions-with-reactiveobject, whenanyvalue, reactivecommand
---

## Use `IActivatableViewModel` with `this.WhenActivated(disposables => { ... })` for subscriptions that should only run while the view is visible

Use `IActivatableViewModel` with `this.WhenActivated(disposables => { ... })` for subscriptions that should only run while the view is visible: to prevent background timers, network polls, and event handlers from running when the view is navigated away.
