---
title: "Return a `Result<T>` from `Parse` methods instead of throwing exceptions"
impact: MEDIUM
impactDescription: "general best practice"
tags: parse-dont-validate, dotnet, validation, designing-domain-models-where-invalid-states-are-unrepresentable-by-parsing-raw-input-into-strongly-typed-value-objects-at-system-boundaries-use-when-enforcing-invariants-through-the-type-system-rather-than-runtime-validation-checks
---

## Return a `Result<T>` from `Parse` methods instead of throwing exceptions

Return a `Result<T>` from `Parse` methods instead of throwing exceptions: for expected failure cases (user input, external data), because exceptions are expensive and should be reserved for unexpected programmer errors; use `Create` that throws only when invalid input represents a bug.
