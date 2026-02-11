---
title: "Use `[Authorize(\"Bearer\")]` on a string parameter for per-request token injection"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: refit, dotnet, web, defining-type-safe-http-api-clients-using-interfaces-and-attributes-with-refits-source-generator-use-when-consuming-rest-apis-where-compile-time-safety, automatic-serialization, and-integration-with-httpclientfactory-and-di-are-needed
---

## Use `[Authorize("Bearer")]` on a string parameter for per-request token injection

Use `[Authorize("Bearer")]` on a string parameter for per-request token injection: in scenarios where different calls may use different tokens (multi-tenant, user impersonation), instead of a shared `DelegatingHandler` that always attaches the same token.
