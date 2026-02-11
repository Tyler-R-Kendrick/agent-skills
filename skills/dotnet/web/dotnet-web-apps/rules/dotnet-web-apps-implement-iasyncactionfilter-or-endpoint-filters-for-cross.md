---
title: "Implement `IAsyncActionFilter` or endpoint filters for cross-cutting validation"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet-web-apps, dotnet, web, choosing-between-and-implementing-net-web-application-patterns-including-mvc, razor-pages, minimal-apis
---

## Implement `IAsyncActionFilter` or endpoint filters for cross-cutting validation

Implement `IAsyncActionFilter` or endpoint filters for cross-cutting validation: rather than repeating `ModelState.IsValid` checks in every controller action, centralizing validation logic and ensuring no action accidentally skips the check.
