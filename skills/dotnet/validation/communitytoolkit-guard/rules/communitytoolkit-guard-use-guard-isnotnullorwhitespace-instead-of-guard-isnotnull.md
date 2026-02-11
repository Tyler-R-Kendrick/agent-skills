---
title: "Use `Guard.IsNotNullOrWhiteSpace` instead of `Guard.IsNotNull` for string parameters"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: communitytoolkit-guard, dotnet, validation, writing-concise, consistent-guard-clauses-using-communitytoolkitdiagnostics-for-argument-validation, null-checks
---

## Use `Guard.IsNotNullOrWhiteSpace` instead of `Guard.IsNotNull` for string parameters

Use `Guard.IsNotNullOrWhiteSpace` instead of `Guard.IsNotNull` for string parameters: because a non-null empty or whitespace-only string almost always represents an invalid input; `IsNotNull` alone lets `""` and `"   "` pass through, causing downstream errors in database queries or API calls.
