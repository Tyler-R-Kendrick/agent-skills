---
title: "Apply rate limiting using `AddRateLimiter()` with named policies"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: aspnet-core, dotnet, web, building-web-apis, web-applications, and-microservices-with-aspnet-core-use-for-minimal-apis
---

## Apply rate limiting using `AddRateLimiter()` with named policies

(e.g., `"api"`, `"auth"`) and assign them to endpoint groups via `.RequireRateLimiting("api")`, rather than implementing custom rate-limiting middleware, so that limits are configurable per-route and testable via the built-in rate-limiting infrastructure.
