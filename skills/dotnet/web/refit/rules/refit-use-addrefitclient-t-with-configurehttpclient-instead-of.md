---
title: "Use `AddRefitClient<T>()` with `ConfigureHttpClient()` instead of `RestService.For<T>()`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: refit, dotnet, web, defining-type-safe-http-api-clients-using-interfaces-and-attributes-with-refits-source-generator-use-when-consuming-rest-apis-where-compile-time-safety, automatic-serialization, and-integration-with-httpclientfactory-and-di-are-needed
---

## Use `AddRefitClient<T>()` with `ConfigureHttpClient()` instead of `RestService.For<T>()`

Use `AddRefitClient<T>()` with `ConfigureHttpClient()` instead of `RestService.For<T>()`: so that Refit clients participate in `HttpClientFactory`'s handler lifecycle management, preventing socket exhaustion from creating `HttpClient` instances manually.
