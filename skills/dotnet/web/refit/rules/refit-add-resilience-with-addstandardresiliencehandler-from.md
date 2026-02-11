---
title: "Add resilience with `.AddStandardResilienceHandler()` from `Microsoft.Extensions.Http.Resilience`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: refit, dotnet, web, defining-type-safe-http-api-clients-using-interfaces-and-attributes-with-refits-source-generator-use-when-consuming-rest-apis-where-compile-time-safety, automatic-serialization, and-integration-with-httpclientfactory-and-di-are-needed
---

## Add resilience with `.AddStandardResilienceHandler()` from `Microsoft.Extensions.Http.Resilience`

Add resilience with `.AddStandardResilienceHandler()` from `Microsoft.Extensions.Http.Resilience`: on `AddRefitClient` registrations to automatically retry transient failures, apply circuit breakers, and enforce timeouts, rather than implementing retry logic in the consuming service.
