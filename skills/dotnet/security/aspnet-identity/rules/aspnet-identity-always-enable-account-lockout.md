---
title: "Always enable account lockout"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspnet-identity, dotnet, security, user-registration, loginlogout-flows, password-management
---

## Always enable account lockout

Always enable account lockout: configure `MaxFailedAccessAttempts` (5) and `DefaultLockoutTimeSpan` (15 minutes) to mitigate brute-force attacks while avoiding permanent lockout.
