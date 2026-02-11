---
title: "Use UTC times consistently"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: ncrontab, dotnet, general, parsing-cron-expressions, calculating-nextprevious-occurrences, validating-cron-syntax
---

## Use UTC times consistently

Use UTC times consistently: with `DateTime.UtcNow` for cron calculations to avoid daylight saving time issues that cause skipped or doubled executions.
