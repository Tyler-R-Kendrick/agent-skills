---
title: "Use `ObserveOn(scheduler)` to marshal notifications to the UI thread"
impact: MEDIUM
impactDescription: "general best practice"
tags: reactive-extensions, dotnet, reactive, composing-event-streams, ui-events, timers
---

## Use `ObserveOn(scheduler)` to marshal notifications to the UI thread

Use `ObserveOn(scheduler)` to marshal notifications to the UI thread: and `SubscribeOn(scheduler)` to control which thread the subscription (source) runs on; place `ObserveOn` as late as possible in the pipeline for best performance.
