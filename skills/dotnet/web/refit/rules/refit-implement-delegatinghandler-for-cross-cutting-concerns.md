---
title: "Implement `DelegatingHandler` for cross-cutting concerns"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: refit, dotnet, web, defining-type-safe-http-api-clients-using-interfaces-and-attributes-with-refits-source-generator-use-when-consuming-rest-apis-where-compile-time-safety, automatic-serialization, and-integration-with-httpclientfactory-and-di-are-needed
---

## Implement `DelegatingHandler` for cross-cutting concerns

(authentication, logging, correlation IDs) and register them with `.AddHttpMessageHandler<T>()`, so that all requests through a Refit client include the required headers without modifying each interface method.
