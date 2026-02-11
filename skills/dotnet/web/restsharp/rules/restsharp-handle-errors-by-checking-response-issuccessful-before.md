---
title: "Handle errors by checking `response.IsSuccessful` before accessing `response.Data`"
impact: MEDIUM
impactDescription: "general best practice"
tags: restsharp, dotnet, web, making-http-api-calls-using-restsharps-fluent-request-builder-with-automatic-serialization, authenticators, and-response-handling-use-when-consuming-rest-apis-that-need-configurable-serialization
---

## Handle errors by checking `response.IsSuccessful` before accessing `response.Data`

Handle errors by checking `response.IsSuccessful` before accessing `response.Data`: and examine `response.ErrorException` for transport errors and `response.Content` for API error bodies, rather than only checking the deserialized `Data` property which is null on failure.
