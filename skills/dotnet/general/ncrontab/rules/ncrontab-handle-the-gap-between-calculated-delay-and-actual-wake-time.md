---
title: "Handle the gap between calculated delay and actual wake time"
impact: MEDIUM
impactDescription: "general best practice"
tags: ncrontab, dotnet, general, parsing-cron-expressions, calculating-nextprevious-occurrences, validating-cron-syntax
---

## Handle the gap between calculated delay and actual wake time

Handle the gap between calculated delay and actual wake time: by re-checking the current time after `Task.Delay` returns, since the OS may wake the task slightly early or late.
