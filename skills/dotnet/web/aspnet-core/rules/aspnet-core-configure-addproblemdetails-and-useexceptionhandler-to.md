---
title: "Configure `AddProblemDetails()` and `UseExceptionHandler()` to return RFC 7807 problem details for all error responses"
impact: MEDIUM
impactDescription: "general best practice"
tags: aspnet-core, dotnet, web, building-web-apis, web-applications, and-microservices-with-aspnet-core-use-for-minimal-apis
---

## Configure `AddProblemDetails()` and `UseExceptionHandler()` to return RFC 7807 problem details for all error responses

Configure `AddProblemDetails()` and `UseExceptionHandler()` to return RFC 7807 problem details for all error responses: instead of returning raw exception messages or custom error shapes, so that API clients can parse errors consistently using a standard format across all endpoints.
