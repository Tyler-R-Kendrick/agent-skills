---
title: "Set password requirements to NIST guidelines"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: aspnet-identity, dotnet, security, user-registration, loginlogout-flows, password-management
---

## Set password requirements to NIST guidelines

Set password requirements to NIST guidelines: require minimum 12 characters, check against breached password lists using `IPasswordValidator<TUser>`, and avoid arbitrary complexity rules that frustrate users.
