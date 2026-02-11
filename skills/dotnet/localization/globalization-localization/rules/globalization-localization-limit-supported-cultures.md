---
title: "Limit supported cultures"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: globalization-localization, dotnet, localization, culture-aware-formatting, request-localization-middleware, datenumbercurrency-formatting-across-cultures
---

## Limit supported cultures

Limit supported cultures: to those you actually have translations for; do not accept arbitrary culture codes to avoid fallback surprises.
