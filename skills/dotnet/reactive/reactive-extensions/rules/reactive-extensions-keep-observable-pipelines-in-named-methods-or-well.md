---
title: "Keep observable pipelines in named methods or well-commented chains"
impact: MEDIUM
impactDescription: "general best practice"
tags: reactive-extensions, dotnet, reactive, composing-event-streams, ui-events, timers
---

## Keep observable pipelines in named methods or well-commented chains

Keep observable pipelines in named methods or well-commented chains: because deeply nested LINQ operators become unreadable; extract complex sub-pipelines into descriptive methods that return `IObservable<T>`.
