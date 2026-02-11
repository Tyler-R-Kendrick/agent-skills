---
title: "Keep view model constructors synchronous and move async initialization into a `ReactiveCommand` or `WhenActivated` block"
impact: MEDIUM
impactDescription: "general best practice"
tags: reactiveui, dotnet, reactive, building-mvvm-applications-using-reactive-extensions-with-reactiveobject, whenanyvalue, reactivecommand
---

## Keep view model constructors synchronous and move async initialization into a `ReactiveCommand` or `WhenActivated` block

Keep view model constructors synchronous and move async initialization into a `ReactiveCommand` or `WhenActivated` block: because constructors cannot be awaited and async void constructors crash on unhandled exceptions.
