---
title: "Collect all parse errors before returning to the client"
impact: MEDIUM
impactDescription: "general best practice"
tags: parse-dont-validate, dotnet, validation, designing-domain-models-where-invalid-states-are-unrepresentable-by-parsing-raw-input-into-strongly-typed-value-objects-at-system-boundaries-use-when-enforcing-invariants-through-the-type-system-rather-than-runtime-validation-checks
---

## Collect all parse errors before returning to the client

Collect all parse errors before returning to the client: by evaluating all `Result<T>` instances and aggregating failures into a single error response, rather than failing fast on the first invalid field; users expect to see all form errors at once, not one at a time.
