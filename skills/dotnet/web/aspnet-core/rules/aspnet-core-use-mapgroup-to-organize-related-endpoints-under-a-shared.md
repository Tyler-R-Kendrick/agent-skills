---
title: "Use `MapGroup()` to organize related endpoints under a shared prefix, tag, and filter set"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: aspnet-core, dotnet, web, building-web-apis, web-applications, and-microservices-with-aspnet-core-use-for-minimal-apis
---

## Use `MapGroup()` to organize related endpoints under a shared prefix, tag, and filter set

Use `MapGroup()` to organize related endpoints under a shared prefix, tag, and filter set: instead of repeating `.WithTags()`, `.RequireAuthorization()`, and route prefixes on every endpoint, reducing duplication and ensuring that new endpoints in the group inherit the correct policies.
