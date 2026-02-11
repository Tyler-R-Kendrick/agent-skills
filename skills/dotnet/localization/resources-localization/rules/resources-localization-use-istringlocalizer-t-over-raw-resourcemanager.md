---
title: "Use `IStringLocalizer<T>` over raw `ResourceManager`"
impact: MEDIUM
impactDescription: "general best practice"
tags: resources-localization, dotnet, localization, resx-resource-file-management, istringlocalizer-and-istringlocalizerfactory-usage, strongly-typed-resource-access
---

## Use `IStringLocalizer<T>` over raw `ResourceManager`

Use `IStringLocalizer<T>` over raw `ResourceManager`: in ASP.NET Core applications to benefit from DI, culture-aware middleware, and the `IHtmlLocalizer` variant.
