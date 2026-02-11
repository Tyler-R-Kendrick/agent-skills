---
title: "Use the built-in token providers"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspnet-identity, dotnet, security, user-registration, loginlogout-flows, password-management
---

## Use the built-in token providers

Use the built-in token providers: never implement custom password reset or confirmation token generation; use `GeneratePasswordResetTokenAsync` and `GenerateEmailConfirmationTokenAsync`.
