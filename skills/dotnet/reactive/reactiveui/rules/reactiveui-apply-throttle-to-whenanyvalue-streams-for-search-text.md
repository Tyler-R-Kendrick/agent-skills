---
title: "Apply `Throttle` to `WhenAnyValue` streams for search text inputs"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: reactiveui, dotnet, reactive, building-mvvm-applications-using-reactive-extensions-with-reactiveobject, whenanyvalue, reactivecommand
---

## Apply `Throttle` to `WhenAnyValue` streams for search text inputs

Apply `Throttle` to `WhenAnyValue` streams for search text inputs: to avoid executing an API call on every keystroke; `Throttle(TimeSpan.FromMilliseconds(300))` waits for the user to stop typing before emitting.
