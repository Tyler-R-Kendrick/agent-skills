---
title: "Prefer `AddIdentityCore<T>` over `AddIdentity<T>`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspnet-identity, dotnet, security, user-registration, loginlogout-flows, password-management
---

## Prefer `AddIdentityCore<T>` over `AddIdentity<T>`

Prefer `AddIdentityCore<T>` over `AddIdentity<T>`: in API projects to avoid pulling in cookie-based UI dependencies you do not need.
