---
title: "Use `TypedResults` return types (e.g., `Task<Results<Ok<T>, NotFound>>`) on minimal API endpoints"
impact: MEDIUM
impactDescription: "general best practice"
tags: aspnet-core, dotnet, web, building-web-apis, web-applications, and-microservices-with-aspnet-core-use-for-minimal-apis
---

## Use `TypedResults` return types (e.g., `Task<Results<Ok<T>, NotFound>>`) on minimal API endpoints

Use `TypedResults` return types (e.g., `Task<Results<Ok<T>, NotFound>>`) on minimal API endpoints: instead of returning `IResult` so that the OpenAPI generator infers response schemas and status codes automatically, producing accurate Swagger documentation without manual `[ProducesResponseType]` attributes.
