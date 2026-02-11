---
title: "Validate culture names"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: globalization-localization, dotnet, localization, culture-aware-formatting, request-localization-middleware, datenumbercurrency-formatting-across-cultures
---

## Validate culture names

Validate culture names: with `CultureInfo.GetCultureInfo` inside a try-catch before constructing `CultureInfo` objects from user input, to avoid `CultureNotFoundException`.
