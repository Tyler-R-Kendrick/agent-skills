---
title: "Use interceptors for cross-cutting concerns"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: restsharp, dotnet, web, making-http-api-calls-using-restsharps-fluent-request-builder-with-automatic-serialization, authenticators, and-response-handling-use-when-consuming-rest-apis-that-need-configurable-serialization
---

## Use interceptors for cross-cutting concerns

(logging, correlation IDs, metrics) by extending the `Interceptor` base class and adding instances to `RestClientOptions.Interceptors`, rather than modifying each request individually, ensuring all requests consistently include the required behavior.
