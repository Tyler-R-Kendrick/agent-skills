---
title: "Audit authentication events"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspnet-identity, dotnet, security, user-registration, loginlogout-flows, password-management
---

## Audit authentication events

Audit authentication events: subscribe to `SecurityStampChanged` and log all sign-in attempts (success, failure, lockout) for compliance and incident response.
