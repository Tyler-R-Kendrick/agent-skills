---
title: "Use `LocalDate` for dates that have no time component"
impact: MEDIUM
impactDescription: "general best practice"
tags: nodatime, dotnet, general, precise-datetime-handling, time-zone-conversions, period-and-duration-calculations
---

## Use `LocalDate` for dates that have no time component

(birthdays, holidays, business dates) instead of `DateTime` with time set to midnight.
