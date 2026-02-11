---
title: "Use `Guard.HasSizeGreaterThan(collection, 0)` instead of checking `.Count > 0` manually and throwing"
impact: MEDIUM
impactDescription: "general best practice"
tags: communitytoolkit-guard, dotnet, validation, writing-concise, consistent-guard-clauses-using-communitytoolkitdiagnostics-for-argument-validation, null-checks
---

## Use `Guard.HasSizeGreaterThan(collection, 0)` instead of checking `.Count > 0` manually and throwing

Use `Guard.HasSizeGreaterThan(collection, 0)` instead of checking `.Count > 0` manually and throwing: because the Guard method generates a standardized exception message that includes the collection name (via `CallerArgumentExpression`) and the expected size constraint.
