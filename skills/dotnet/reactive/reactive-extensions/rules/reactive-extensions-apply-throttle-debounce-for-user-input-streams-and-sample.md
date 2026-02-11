---
title: "Apply `Throttle` (debounce) for user input streams and `Sample` for periodic snapshots"
impact: MEDIUM
impactDescription: "general best practice"
tags: reactive-extensions, dotnet, reactive, composing-event-streams, ui-events, timers
---

## Apply `Throttle` (debounce) for user input streams and `Sample` for periodic snapshots

`Throttle` waits for a quiet period before emitting, while `Sample` emits the latest value at fixed intervals regardless of activity.
