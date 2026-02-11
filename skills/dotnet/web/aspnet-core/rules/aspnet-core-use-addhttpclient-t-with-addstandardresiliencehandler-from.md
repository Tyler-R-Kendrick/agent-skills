---
title: "Use `AddHttpClient<T>()` with `AddStandardResilienceHandler()` from `Microsoft.Extensions.Http.Resilience`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: aspnet-core, dotnet, web, building-web-apis, web-applications, and-microservices-with-aspnet-core-use-for-minimal-apis
---

## Use `AddHttpClient<T>()` with `AddStandardResilienceHandler()` from `Microsoft.Extensions.Http.Resilience`

Use `AddHttpClient<T>()` with `AddStandardResilienceHandler()` from `Microsoft.Extensions.Http.Resilience`: instead of creating `HttpClient` instances manually, because the factory manages `HttpMessageHandler` lifetimes (preventing socket exhaustion) and the resilience handler adds retry, circuit breaker, and timeout policies.
