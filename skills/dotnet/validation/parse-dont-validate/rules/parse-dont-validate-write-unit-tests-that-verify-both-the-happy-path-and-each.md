---
title: "Write unit tests that verify both the happy path and each specific rejection case"
impact: MEDIUM
impactDescription: "general best practice"
tags: parse-dont-validate, dotnet, validation, designing-domain-models-where-invalid-states-are-unrepresentable-by-parsing-raw-input-into-strongly-typed-value-objects-at-system-boundaries-use-when-enforcing-invariants-through-the-type-system-rather-than-runtime-validation-checks
---

## Write unit tests that verify both the happy path and each specific rejection case

Write unit tests that verify both the happy path and each specific rejection case: for every value object's `Parse` method (null, empty, too long, malformed, boundary values), because the parser is the single source of truth for what constitutes valid data in the entire system.
