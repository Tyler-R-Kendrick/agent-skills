---
title: "Always pass an explicit `CultureInfo`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: globalization-localization, dotnet, localization, culture-aware-formatting, request-localization-middleware, datenumbercurrency-formatting-across-cultures
---

## Always pass an explicit `CultureInfo`

Always pass an explicit `CultureInfo`: to `ToString`, `Parse`, and `TryParse` methods instead of relying on `CultureInfo.CurrentCulture`, which varies per-thread and per-request.
