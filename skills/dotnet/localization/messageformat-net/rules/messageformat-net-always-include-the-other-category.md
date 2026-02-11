---
title: "Always include the `other` category"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: messageformat-net, dotnet, localization, icu-messageformat-pluralization, genderselect-patterns, complex-parameterized-localization-messages
---

## Always include the `other` category

Always include the `other` category: in both `plural` and `select` blocks as a required fallback; omitting it causes runtime errors for unmatched values.
