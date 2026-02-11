---
title: "Register `RequestLocalizationMiddleware` early"
impact: MEDIUM
impactDescription: "general best practice"
tags: globalization-localization, dotnet, localization, culture-aware-formatting, request-localization-middleware, datenumbercurrency-formatting-across-cultures
---

## Register `RequestLocalizationMiddleware` early

Register `RequestLocalizationMiddleware` early: in the pipeline (before MVC/Razor), so all downstream middleware observes the correct culture.
