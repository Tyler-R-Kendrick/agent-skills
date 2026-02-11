---
title: "Use `AddUrlSegment()` for path parameters"
impact: MEDIUM
impactDescription: "general best practice"
tags: restsharp, dotnet, web, making-http-api-calls-using-restsharps-fluent-request-builder-with-automatic-serialization, authenticators, and-response-handling-use-when-consuming-rest-apis-that-need-configurable-serialization
---

## Use `AddUrlSegment()` for path parameters

(e.g., `"api/products/{id}"` with `.AddUrlSegment("id", 42)`) instead of string interpolation (`$"api/products/{id}"`), because URL segments are properly encoded and the request template remains readable in logs and interceptors.
