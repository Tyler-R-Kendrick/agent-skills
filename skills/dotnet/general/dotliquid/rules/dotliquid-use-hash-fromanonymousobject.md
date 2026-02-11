---
title: "Use `Hash.FromAnonymousObject`"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotliquid, dotnet, general, safe-user-generated-templates, email-templates, cms-content-rendering
---

## Use `Hash.FromAnonymousObject`

Use `Hash.FromAnonymousObject`: for simple data but switch to `Hash.FromDictionary` when building data dynamically from multiple sources.
