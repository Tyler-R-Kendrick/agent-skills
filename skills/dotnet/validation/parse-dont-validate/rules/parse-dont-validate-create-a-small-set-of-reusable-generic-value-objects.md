---
title: "Create a small set of reusable generic value objects"
impact: MEDIUM
impactDescription: "general best practice"
tags: parse-dont-validate, dotnet, validation, designing-domain-models-where-invalid-states-are-unrepresentable-by-parsing-raw-input-into-strongly-typed-value-objects-at-system-boundaries-use-when-enforcing-invariants-through-the-type-system-rather-than-runtime-validation-checks
---

## Create a small set of reusable generic value objects

(`NonEmptyString`, `PositiveInt`, `BoundedString<TMin, TMax>`, `PositiveAmount`) rather than creating hundreds of domain-specific types for every field; compose these building blocks to cover most validation needs.
