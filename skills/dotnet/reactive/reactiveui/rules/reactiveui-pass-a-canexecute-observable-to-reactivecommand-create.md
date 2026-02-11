---
title: "Pass a `canExecute` observable to `ReactiveCommand.Create`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: reactiveui, dotnet, reactive, building-mvvm-applications-using-reactive-extensions-with-reactiveobject, whenanyvalue, reactivecommand
---

## Pass a `canExecute` observable to `ReactiveCommand.Create`

Pass a `canExecute` observable to `ReactiveCommand.Create`: so that the command automatically disables bound buttons when the condition is false, and automatically disables during execution to prevent double-submission.
