---
title: "Define one Refit interface per API domain"
impact: MEDIUM
impactDescription: "general best practice"
tags: refit, dotnet, web, defining-type-safe-http-api-clients-using-interfaces-and-attributes-with-refits-source-generator-use-when-consuming-rest-apis-where-compile-time-safety, automatic-serialization, and-integration-with-httpclientfactory-and-di-are-needed
---

## Define one Refit interface per API domain

(e.g., `IProductsApi`, `IOrdersApi`, `IUsersApi`) rather than one monolithic interface, so that each interface can be registered with different `HttpClient` configurations (base URL, timeout, retry policy) and injected only where needed.
