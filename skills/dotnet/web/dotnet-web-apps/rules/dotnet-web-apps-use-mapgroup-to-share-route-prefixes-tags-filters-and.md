---
title: "Use `MapGroup()` to share route prefixes, tags, filters, and authorization policies"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dotnet-web-apps, dotnet, web, choosing-between-and-implementing-net-web-application-patterns-including-mvc, razor-pages, minimal-apis
---

## Use `MapGroup()` to share route prefixes, tags, filters, and authorization policies

Use `MapGroup()` to share route prefixes, tags, filters, and authorization policies: across related endpoints instead of duplicating `.RequireAuthorization()` and `.WithTags()` on every individual endpoint, reducing boilerplate and ensuring policy consistency when new endpoints are added.
