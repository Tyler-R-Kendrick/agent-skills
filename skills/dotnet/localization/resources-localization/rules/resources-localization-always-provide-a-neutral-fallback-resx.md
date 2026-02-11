---
title: "Always provide a neutral fallback `.resx`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: resources-localization, dotnet, localization, resx-resource-file-management, istringlocalizer-and-istringlocalizerfactory-usage, strongly-typed-resource-access
---

## Always provide a neutral fallback `.resx`

(without a culture suffix) for every resource file to ensure the application never displays raw resource keys to users.
