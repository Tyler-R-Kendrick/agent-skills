---
title: "Use `[AliasAs(\"name\")]` on parameters and properties"
impact: MEDIUM
impactDescription: "general best practice"
tags: refit, dotnet, web, defining-type-safe-http-api-clients-using-interfaces-and-attributes-with-refits-source-generator-use-when-consuming-rest-apis-where-compile-time-safety, automatic-serialization, and-integration-with-httpclientfactory-and-di-are-needed
---

## Use `[AliasAs("name")]` on parameters and properties

Use `[AliasAs("name")]` on parameters and properties: when the C# property name differs from the API's expected parameter name (e.g., `[AliasAs("page_size")] int pageSize`), because Refit uses the C# name by default and API servers with snake_case conventions will reject unrecognized parameter names.
