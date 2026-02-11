---
title: "Subscribe to `command.ThrownExceptions` for every `ReactiveCommand`"
impact: MEDIUM
impactDescription: "general best practice"
tags: reactiveui, dotnet, reactive, building-mvvm-applications-using-reactive-extensions-with-reactiveobject, whenanyvalue, reactivecommand
---

## Subscribe to `command.ThrownExceptions` for every `ReactiveCommand`

Subscribe to `command.ThrownExceptions` for every `ReactiveCommand`: because unobserved exceptions in commands are routed to `RxApp.DefaultExceptionHandler` which terminates the application by default.
