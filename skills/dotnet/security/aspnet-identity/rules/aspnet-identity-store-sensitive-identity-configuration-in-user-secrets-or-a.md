---
title: "Store sensitive Identity configuration in user secrets or a vault"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspnet-identity, dotnet, security, user-registration, loginlogout-flows, password-management
---

## Store sensitive Identity configuration in user secrets or a vault

Store sensitive Identity configuration in user secrets or a vault: never hardcode connection strings, token signing keys, or external provider credentials in `appsettings.json`.
