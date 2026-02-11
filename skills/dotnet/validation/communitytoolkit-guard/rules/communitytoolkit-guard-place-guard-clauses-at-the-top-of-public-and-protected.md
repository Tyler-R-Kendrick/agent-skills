---
title: "Place guard clauses at the top of public and protected methods, before any logic"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: communitytoolkit-guard, dotnet, validation, writing-concise, consistent-guard-clauses-using-communitytoolkitdiagnostics-for-argument-validation, null-checks
---

## Place guard clauses at the top of public and protected methods, before any logic

Place guard clauses at the top of public and protected methods, before any logic: so that invalid arguments are rejected immediately with descriptive exceptions; never scatter guards throughout the method body where they can be skipped or overlooked during code review.
