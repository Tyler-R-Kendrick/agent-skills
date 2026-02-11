---
title: "Require email confirmation before login"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: aspnet-identity, dotnet, security, user-registration, loginlogout-flows, password-management
---

## Require email confirmation before login

Require email confirmation before login: set `SignIn.RequireConfirmedEmail = true` and send confirmation tokens via `GenerateEmailConfirmationTokenAsync` to verify account ownership.
