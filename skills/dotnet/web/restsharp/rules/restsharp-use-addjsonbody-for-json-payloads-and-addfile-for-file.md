---
title: "Use `AddJsonBody()` for JSON payloads and `AddFile()` for file uploads"
impact: MEDIUM
impactDescription: "general best practice"
tags: restsharp, dotnet, web, making-http-api-calls-using-restsharps-fluent-request-builder-with-automatic-serialization, authenticators, and-response-handling-use-when-consuming-rest-apis-that-need-configurable-serialization
---

## Use `AddJsonBody()` for JSON payloads and `AddFile()` for file uploads

Use `AddJsonBody()` for JSON payloads and `AddFile()` for file uploads: rather than manually constructing `StringContent` or `MultipartFormDataContent`, because RestSharp sets the correct `Content-Type` headers and handles serialization and encoding automatically.
