---
title: "Use `Interaction<TInput, TOutput>` instead of injecting view-layer services into view models"
impact: MEDIUM
impactDescription: "general best practice"
tags: reactiveui, dotnet, reactive, building-mvvm-applications-using-reactive-extensions-with-reactiveobject, whenanyvalue, reactivecommand
---

## Use `Interaction<TInput, TOutput>` instead of injecting view-layer services into view models

Use `Interaction<TInput, TOutput>` instead of injecting view-layer services into view models: to keep view models testable; in tests, register a handler that returns a predetermined response without showing UI.
