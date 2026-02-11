---
title: "Log missing resource keys in development"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: resources-localization, dotnet, localization, resx-resource-file-management, istringlocalizer-and-istringlocalizerfactory-usage, strongly-typed-resource-access
---

## Log missing resource keys in development

Log missing resource keys in development: by checking `LocalizedString.ResourceNotFound` to catch untranslated strings before they reach production.
