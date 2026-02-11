---
title: "Organize resources to mirror the namespace structure"
impact: MEDIUM
impactDescription: "general best practice"
tags: resources-localization, dotnet, localization, resx-resource-file-management, istringlocalizer-and-istringlocalizerfactory-usage, strongly-typed-resource-access
---

## Organize resources to mirror the namespace structure

(e.g., `Resources/Services/OrderService.resx`) so that `IStringLocalizer<T>` can resolve them automatically.
