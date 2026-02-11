---
title: "Use `[FormatFilter]` with `FormatterMappings.SetMediaTypeMappingForFormat()`"
impact: MEDIUM
impactDescription: "general best practice"
tags: webapicontrib, dotnet, web, extending-aspnet-core-web-api-with-custom-formatters, content-negotiation, and-media-type-handling-using-webapicontribcore-use-when-you-need-to-serve-or-consume-csv
---

## Use `[FormatFilter]` with `FormatterMappings.SetMediaTypeMappingForFormat()`

Use `[FormatFilter]` with `FormatterMappings.SetMediaTypeMappingForFormat()`: to enable URL-based format selection (e.g., `/api/products.csv`, `/api/products.xml`) as an alternative to the `Accept` header, because some clients (browsers, curl without headers) cannot easily set request headers.
