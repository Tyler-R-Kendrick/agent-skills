---
title: "Create `RestClient` instances through `HttpClientFactory`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: restsharp, dotnet, web, making-http-api-calls-using-restsharps-fluent-request-builder-with-automatic-serialization, authenticators, and-response-handling-use-when-consuming-rest-apis-that-need-configurable-serialization
---

## Create `RestClient` instances through `HttpClientFactory`

Create `RestClient` instances through `HttpClientFactory`: by registering named `HttpClient` instances and passing them to the `RestClient` constructor, so that `HttpMessageHandler` lifetimes are managed by the factory and socket exhaustion is prevented.
