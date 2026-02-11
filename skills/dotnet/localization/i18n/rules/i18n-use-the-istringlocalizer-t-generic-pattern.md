---
title: "Use the `IStringLocalizer<T>` generic pattern"
impact: MEDIUM
impactDescription: "general best practice"
tags: i18n, dotnet, localization, designing-i18n-ready-applications, externalizing-user-facing-strings, building-multi-language-aspnet-core-apps
---

## Use the `IStringLocalizer<T>` generic pattern

Use the `IStringLocalizer<T>` generic pattern: instead of `IStringLocalizerFactory` directly, so the DI container automatically resolves the correct resource file based on the type.
