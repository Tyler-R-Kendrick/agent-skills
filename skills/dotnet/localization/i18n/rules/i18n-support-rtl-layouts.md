---
title: "Support RTL layouts"
impact: MEDIUM
impactDescription: "general best practice"
tags: i18n, dotnet, localization, designing-i18n-ready-applications, externalizing-user-facing-strings, building-multi-language-aspnet-core-apps
---

## Support RTL layouts

Support RTL layouts: by setting `dir="rtl"` conditionally in your layout based on `CultureInfo.CurrentUICulture.TextInfo.IsRightToLeft`.
