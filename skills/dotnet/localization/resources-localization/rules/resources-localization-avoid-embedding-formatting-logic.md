---
title: "Avoid embedding formatting logic"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: resources-localization, dotnet, localization, resx-resource-file-management, istringlocalizer-and-istringlocalizerfactory-usage, strongly-typed-resource-access
---

## Avoid embedding formatting logic

(dates, numbers) in resource values; keep the raw parameterized string in the `.resx` and format values in code using `CultureInfo`.
