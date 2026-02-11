---
title: "Use `ThrowHelper.ThrowArgumentException(nameof(param), message)` for custom validation logic"
impact: MEDIUM
impactDescription: "general best practice"
tags: communitytoolkit-guard, dotnet, validation, writing-concise, consistent-guard-clauses-using-communitytoolkitdiagnostics-for-argument-validation, null-checks
---

## Use `ThrowHelper.ThrowArgumentException(nameof(param), message)` for custom validation logic

Use `ThrowHelper.ThrowArgumentException(nameof(param), message)` for custom validation logic: that Guard does not cover (regex matching, cross-parameter checks), keeping the exception type and message format consistent with the auto-generated Guard exceptions.
