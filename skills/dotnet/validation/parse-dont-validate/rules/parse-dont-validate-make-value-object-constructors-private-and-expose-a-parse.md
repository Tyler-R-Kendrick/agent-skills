---
title: "Make value object constructors private and expose a `Parse`, `TryCreate`, or `Create` factory method"
impact: MEDIUM
impactDescription: "general best practice"
tags: parse-dont-validate, dotnet, validation, designing-domain-models-where-invalid-states-are-unrepresentable-by-parsing-raw-input-into-strongly-typed-value-objects-at-system-boundaries-use-when-enforcing-invariants-through-the-type-system-rather-than-runtime-validation-checks
---

## Make value object constructors private and expose a `Parse`, `TryCreate`, or `Create` factory method

Make value object constructors private and expose a `Parse`, `TryCreate`, or `Create` factory method: so that the only way to obtain an instance is through the validation path; a public constructor allows anyone to create invalid instances, defeating the purpose of the pattern.
