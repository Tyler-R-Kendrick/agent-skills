---
title: "Avoid wrapping Guard calls in try-catch blocks in the same method"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: communitytoolkit-guard, dotnet, validation, writing-concise, consistent-guard-clauses-using-communitytoolkitdiagnostics-for-argument-validation, null-checks
---

## Avoid wrapping Guard calls in try-catch blocks in the same method

Avoid wrapping Guard calls in try-catch blocks in the same method: because `ArgumentNullException` and `ArgumentOutOfRangeException` are not recoverable errors -- they indicate a bug in the calling code; catching them masks the root cause and produces confusing behavior in production.
