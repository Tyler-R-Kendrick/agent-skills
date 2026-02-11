---
title: "Configure `RefitSettings` with `SystemTextJsonContentSerializer`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: refit, dotnet, web, defining-type-safe-http-api-clients-using-interfaces-and-attributes-with-refits-source-generator-use-when-consuming-rest-apis-where-compile-time-safety, automatic-serialization, and-integration-with-httpclientfactory-and-di-are-needed
---

## Configure `RefitSettings` with `SystemTextJsonContentSerializer`

Configure `RefitSettings` with `SystemTextJsonContentSerializer`: and explicit `JsonSerializerOptions` (camelCase naming, null handling) to ensure serialization matches the API contract, rather than relying on default serializer settings that may differ between .NET versions.
