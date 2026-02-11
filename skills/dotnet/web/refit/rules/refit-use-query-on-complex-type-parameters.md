---
title: "Use `[Query]` on complex type parameters"
impact: MEDIUM
impactDescription: "general best practice"
tags: refit, dotnet, web, defining-type-safe-http-api-clients-using-interfaces-and-attributes-with-refits-source-generator-use-when-consuming-rest-apis-where-compile-time-safety, automatic-serialization, and-integration-with-httpclientfactory-and-di-are-needed
---

## Use `[Query]` on complex type parameters

Use `[Query]` on complex type parameters: to automatically flatten object properties into query string parameters (`?term=shoes&minPrice=10&maxPrice=100`) instead of building query strings manually, keeping method signatures clean and type-safe.
