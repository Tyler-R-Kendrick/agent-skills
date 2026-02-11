---
title: "Scope DbContext per request"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspnet-identity, dotnet, security, user-registration, loginlogout-flows, password-management
---

## Scope DbContext per request

Scope DbContext per request: register `AppDbContext` as scoped to prevent concurrency issues; never share a single DbContext across multiple requests.
