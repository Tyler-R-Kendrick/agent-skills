---
title: "Use `CultureInfo.InvariantCulture`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: globalization-localization, dotnet, localization, culture-aware-formatting, request-localization-middleware, datenumbercurrency-formatting-across-cultures
---

## Use `CultureInfo.InvariantCulture`

Use `CultureInfo.InvariantCulture`: for machine-readable data such as log entries, config files, and inter-service communication to avoid locale-dependent parsing failures.
