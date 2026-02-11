---
title: "Return `Task<ApiResponse<T>>` instead of `Task<T>` on interface methods"
impact: MEDIUM
impactDescription: "general best practice"
tags: refit, dotnet, web, defining-type-safe-http-api-clients-using-interfaces-and-attributes-with-refits-source-generator-use-when-consuming-rest-apis-where-compile-time-safety, automatic-serialization, and-integration-with-httpclientfactory-and-di-are-needed
---

## Return `Task<ApiResponse<T>>` instead of `Task<T>` on interface methods

Return `Task<ApiResponse<T>>` instead of `Task<T>` on interface methods: when the calling code needs to inspect HTTP status codes, headers, or error bodies without catching exceptions, because `ApiResponse<T>` wraps the response metadata and deserialized content together.
