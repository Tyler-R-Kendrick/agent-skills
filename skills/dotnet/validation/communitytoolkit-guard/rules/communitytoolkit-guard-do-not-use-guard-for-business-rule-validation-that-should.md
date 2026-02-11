---
title: "Do not use Guard for business-rule validation that should return error messages to users"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: communitytoolkit-guard, dotnet, validation, writing-concise, consistent-guard-clauses-using-communitytoolkitdiagnostics-for-argument-validation, null-checks
---

## Do not use Guard for business-rule validation that should return error messages to users

(e.g., "Password must contain a special character"); Guard throws exceptions that terminate the call stack, which is appropriate for programming errors but not for user input validation that should be handled with result objects or FluentValidation.
