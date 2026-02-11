---
title: "Separate authorization concerns from business logic"
impact: MEDIUM
impactDescription: "general best practice"
tags: topaz, dotnet, security, fine-grained-permissions, relationship-based-access-control-rebac, google-zanzibar-style-authorization
---

## Separate authorization concerns from business logic

Separate authorization concerns from business logic: inject an `IAuthorizationService` wrapper around the Topaz client so controllers only call `CanEditAsync(userId, resourceId)` without knowing about Topaz internals.
