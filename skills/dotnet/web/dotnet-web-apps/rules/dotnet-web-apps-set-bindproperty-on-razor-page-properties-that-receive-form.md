---
title: "Set `[BindProperty]` on Razor Page properties that receive form data"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dotnet-web-apps, dotnet, web, choosing-between-and-implementing-net-web-application-patterns-including-mvc, razor-pages, minimal-apis
---

## Set `[BindProperty]` on Razor Page properties that receive form data

Set `[BindProperty]` on Razor Page properties that receive form data: and use a nested `Input` class to group all bound properties, rather than binding directly to the domain model, to prevent over-posting attacks where malicious users submit fields that should not be user-editable.
