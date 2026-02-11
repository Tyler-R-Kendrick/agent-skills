---
title: "Limit template execution time"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dotliquid, dotnet, general, safe-user-generated-templates, email-templates, cms-content-rendering
---

## Limit template execution time

Limit template execution time: in user-facing scenarios by setting `Template.DefaultMaxIterations` to prevent infinite loops in user-authored templates.
