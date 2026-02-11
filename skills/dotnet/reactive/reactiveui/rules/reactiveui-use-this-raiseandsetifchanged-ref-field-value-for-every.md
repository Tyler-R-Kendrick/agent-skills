---
title: "Use `this.RaiseAndSetIfChanged(ref _field, value)` for every mutable property"
impact: MEDIUM
impactDescription: "general best practice"
tags: reactiveui, dotnet, reactive, building-mvvm-applications-using-reactive-extensions-with-reactiveobject, whenanyvalue, reactivecommand
---

## Use `this.RaiseAndSetIfChanged(ref _field, value)` for every mutable property

Use `this.RaiseAndSetIfChanged(ref _field, value)` for every mutable property: instead of manually calling `OnPropertyChanged` because it handles equality comparison, backing field assignment, and notification in a single atomic call.
