---
title: "Configure serialization explicitly"
impact: MEDIUM
impactDescription: "general best practice"
tags: restsharp, dotnet, web, making-http-api-calls-using-restsharps-fluent-request-builder-with-automatic-serialization, authenticators, and-response-handling-use-when-consuming-rest-apis-that-need-configurable-serialization
---

## Configure serialization explicitly

Configure serialization explicitly: using `configureSerialization: s => s.UseSystemTextJson(options)` when creating the `RestClient` to control property naming, null handling, and enum serialization, rather than relying on default serializer settings that may not match the API's expected format.
