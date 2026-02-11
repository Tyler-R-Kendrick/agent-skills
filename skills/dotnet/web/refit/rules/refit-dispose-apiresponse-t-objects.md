---
title: "Dispose `ApiResponse<T>` objects"
impact: MEDIUM
impactDescription: "general best practice"
tags: refit, dotnet, web, defining-type-safe-http-api-clients-using-interfaces-and-attributes-with-refits-source-generator-use-when-consuming-rest-apis-where-compile-time-safety, automatic-serialization, and-integration-with-httpclientfactory-and-di-are-needed
---

## Dispose `ApiResponse<T>` objects

Dispose `ApiResponse<T>` objects: by wrapping them in `using` statements or calling `Dispose()` after reading the content, because `ApiResponse<T>` holds an `HttpResponseMessage` whose `Content` stream should be released after use to free network connections.
