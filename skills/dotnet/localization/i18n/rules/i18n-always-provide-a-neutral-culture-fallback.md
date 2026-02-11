---
title: "Always provide a neutral culture fallback"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: i18n, dotnet, localization, designing-i18n-ready-applications, externalizing-user-facing-strings, building-multi-language-aspnet-core-apps
---

## Always provide a neutral culture fallback

(e.g., `SharedResource.resx` without a culture suffix) so missing translations return a meaningful default rather than the resource key.
