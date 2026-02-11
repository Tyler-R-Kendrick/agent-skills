---
title: "Use `ExecuteGetAsync<T>()` / `ExecutePostAsync<T>()` instead of `GetAsync<T>()` / `PostAsync<T>()`"
impact: MEDIUM
impactDescription: "general best practice"
tags: restsharp, dotnet, web, making-http-api-calls-using-restsharps-fluent-request-builder-with-automatic-serialization, authenticators, and-response-handling-use-when-consuming-rest-apis-that-need-configurable-serialization
---

## Use `ExecuteGetAsync<T>()` / `ExecutePostAsync<T>()` instead of `GetAsync<T>()` / `PostAsync<T>()`

Use `ExecuteGetAsync<T>()` / `ExecutePostAsync<T>()` instead of `GetAsync<T>()` / `PostAsync<T>()`: when you need to inspect the full response including status code, headers, and error details, because the `Execute*` methods return a `RestResponse<T>` with metadata while the shorthand methods throw on non-success status codes.
