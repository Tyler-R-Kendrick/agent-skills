---
title: "Parse cron expressions once and reuse the `CrontabSchedule` instance"
impact: MEDIUM
impactDescription: "general best practice"
tags: ncrontab, dotnet, general, parsing-cron-expressions, calculating-nextprevious-occurrences, validating-cron-syntax
---

## Parse cron expressions once and reuse the `CrontabSchedule` instance

Parse cron expressions once and reuse the `CrontabSchedule` instance: since parsing involves string splitting and validation that should not repeat per tick.
