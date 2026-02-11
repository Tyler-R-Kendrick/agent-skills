---
title: "Use parameterized localization"
impact: MEDIUM
impactDescription: "general best practice"
tags: i18n, dotnet, localization, designing-i18n-ready-applications, externalizing-user-facing-strings, building-multi-language-aspnet-core-apps
---

## Use parameterized localization

(`_localizer["Hello, {0}!", name]`) instead of string concatenation to support word-order differences across languages.
