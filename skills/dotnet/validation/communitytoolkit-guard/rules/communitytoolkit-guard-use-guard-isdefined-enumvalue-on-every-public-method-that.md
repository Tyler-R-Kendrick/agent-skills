---
title: "Use `Guard.IsDefined(enumValue)` on every public method that accepts an enum parameter"
impact: MEDIUM
impactDescription: "general best practice"
tags: communitytoolkit-guard, dotnet, validation, writing-concise, consistent-guard-clauses-using-communitytoolkitdiagnostics-for-argument-validation, null-checks
---

## Use `Guard.IsDefined(enumValue)` on every public method that accepts an enum parameter

Use `Guard.IsDefined(enumValue)` on every public method that accepts an enum parameter: because C# allows casting arbitrary integers to enum types; without `IsDefined`, a caller can pass `(OrderStatus)999` and bypass switch expressions or pattern matches that assume valid values.
