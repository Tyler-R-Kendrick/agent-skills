---
title: "Implement `ITargetingContextAccessor` to provide user..."
impact: MEDIUM
impactDescription: "general best practice"
tags: feature-management, dotnet, configuration, configuration-driven-feature-flags, percentage-based-rollouts, time-windowed-features
---

## Implement `ITargetingContextAccessor` to provide user...

Implement `ITargetingContextAccessor` to provide user identity and group membership from `HttpContext.User` claims so that targeting filters work correctly in web applications.
