---
title: "Use the six-field format with `IncludingSeconds = true`"
impact: MEDIUM
impactDescription: "general best practice"
tags: ncrontab, dotnet, general, parsing-cron-expressions, calculating-nextprevious-occurrences, validating-cron-syntax
---

## Use the six-field format with `IncludingSeconds = true`

Use the six-field format with `IncludingSeconds = true`: only when sub-minute precision is genuinely needed -- five-field expressions are more portable and widely understood.
