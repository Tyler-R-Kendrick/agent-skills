---
title: "Use built-in authenticators"
impact: MEDIUM
impactDescription: "general best practice"
tags: restsharp, dotnet, web, making-http-api-calls-using-restsharps-fluent-request-builder-with-automatic-serialization, authenticators, and-response-handling-use-when-consuming-rest-apis-that-need-configurable-serialization
---

## Use built-in authenticators

(`JwtAuthenticator`, `HttpBasicAuthenticator`, `OAuth2AuthorizationRequestHeaderAuthenticator`) rather than manually adding `Authorization` headers to each request, because authenticators apply consistently to all requests and can be swapped without modifying request-building code.
