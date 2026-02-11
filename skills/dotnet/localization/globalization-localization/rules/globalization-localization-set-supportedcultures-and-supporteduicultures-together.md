---
title: "Set `SupportedCultures` and `SupportedUICultures` together"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: globalization-localization, dotnet, localization, culture-aware-formatting, request-localization-middleware, datenumbercurrency-formatting-across-cultures
---

## Set `SupportedCultures` and `SupportedUICultures` together

Set `SupportedCultures` and `SupportedUICultures` together: in `RequestLocalizationOptions` to avoid mismatches between formatting culture and resource lookup culture.
