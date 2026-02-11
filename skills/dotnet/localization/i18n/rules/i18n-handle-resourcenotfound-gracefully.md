---
title: "Handle `ResourceNotFound` gracefully"
impact: MEDIUM
impactDescription: "general best practice"
tags: i18n, dotnet, localization, designing-i18n-ready-applications, externalizing-user-facing-strings, building-multi-language-aspnet-core-apps
---

## Handle `ResourceNotFound` gracefully

Handle `ResourceNotFound` gracefully: by checking `LocalizedString.ResourceNotFound` in development mode and logging missing keys for the translation team.
