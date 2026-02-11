---
title: "Inject `IClock` instead of using `SystemClock.Instance` directly"
impact: MEDIUM
impactDescription: "general best practice"
tags: nodatime, dotnet, general, precise-datetime-handling, time-zone-conversions, period-and-duration-calculations
---

## Inject `IClock` instead of using `SystemClock.Instance` directly

Inject `IClock` instead of using `SystemClock.Instance` directly: so tests can use `FakeClock` to control time without modifying system state.
