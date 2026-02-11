---
title: "Use `ObservableAsPropertyHelper<T>` (OAPH) for computed/derived properties"
impact: MEDIUM
impactDescription: "general best practice"
tags: reactiveui, dotnet, reactive, building-mvvm-applications-using-reactive-extensions-with-reactiveobject, whenanyvalue, reactivecommand
---

## Use `ObservableAsPropertyHelper<T>` (OAPH) for computed/derived properties

Use `ObservableAsPropertyHelper<T>` (OAPH) for computed/derived properties: instead of subscribing and setting a property manually; OAPH integrates with ReactiveUI's scheduler and property-change notification automatically.
