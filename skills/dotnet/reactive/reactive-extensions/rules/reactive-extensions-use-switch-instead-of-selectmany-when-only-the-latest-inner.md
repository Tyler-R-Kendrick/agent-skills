---
title: "Use `Switch` instead of `SelectMany` when only the latest inner observable matters"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: reactive-extensions, dotnet, reactive, composing-event-streams, ui-events, timers
---

## Use `Switch` instead of `SelectMany` when only the latest inner observable matters

(e.g., autocomplete search) because `Switch` automatically unsubscribes from the previous inner observable, preventing stale results from arriving after newer ones.
