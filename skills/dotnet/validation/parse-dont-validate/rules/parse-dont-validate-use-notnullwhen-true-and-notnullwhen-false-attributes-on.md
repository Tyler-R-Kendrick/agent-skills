---
title: "Use `[NotNullWhen(true)]` and `[NotNullWhen(false)]` attributes on `TryCreate` out parameters"
impact: MEDIUM
impactDescription: "general best practice"
tags: parse-dont-validate, dotnet, validation, designing-domain-models-where-invalid-states-are-unrepresentable-by-parsing-raw-input-into-strongly-typed-value-objects-at-system-boundaries-use-when-enforcing-invariants-through-the-type-system-rather-than-runtime-validation-checks
---

## Use `[NotNullWhen(true)]` and `[NotNullWhen(false)]` attributes on `TryCreate` out parameters

Use `[NotNullWhen(true)]` and `[NotNullWhen(false)]` attributes on `TryCreate` out parameters: so that the C# nullable flow analysis knows the value is non-null when the method returns true, eliminating false null warnings in consuming code without requiring the `!` operator.
