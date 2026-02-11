---
title: "Use `Publish().RefCount()` to share a single upstream subscription among multiple downstream subscribers"
impact: MEDIUM
impactDescription: "general best practice"
tags: reactive-extensions, dotnet, reactive, composing-event-streams, ui-events, timers
---

## Use `Publish().RefCount()` to share a single upstream subscription among multiple downstream subscribers

Use `Publish().RefCount()` to share a single upstream subscription among multiple downstream subscribers: instead of letting each subscriber create its own connection to the data source, which duplicates network calls or event handlers.
