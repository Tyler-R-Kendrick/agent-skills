---
title: "Pass `CancellationToken` to all async methods"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: restsharp, dotnet, web, making-http-api-calls-using-restsharps-fluent-request-builder-with-automatic-serialization, authenticators, and-response-handling-use-when-consuming-rest-apis-that-need-configurable-serialization
---

## Pass `CancellationToken` to all async methods

Pass `CancellationToken` to all async methods: from the calling context (controller, hosted service) so that HTTP requests are cancelled when the client disconnects or the application shuts down, preventing wasted network calls and improving shutdown performance.
