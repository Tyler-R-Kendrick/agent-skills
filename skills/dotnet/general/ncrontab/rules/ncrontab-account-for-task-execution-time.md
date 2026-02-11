---
title: "Account for task execution time"
impact: MEDIUM
impactDescription: "general best practice"
tags: ncrontab, dotnet, general, parsing-cron-expressions, calculating-nextprevious-occurrences, validating-cron-syntax
---

## Account for task execution time

Account for task execution time: when calculating the next occurrence -- if a task takes 5 minutes and runs every 5 minutes, use the task's end time as the base for `GetNextOccurrence`.
