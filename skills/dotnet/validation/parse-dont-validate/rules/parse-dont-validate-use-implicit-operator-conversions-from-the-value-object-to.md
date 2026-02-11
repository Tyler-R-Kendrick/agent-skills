---
title: "Use `implicit operator` conversions from the value object to its primitive type"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: parse-dont-validate, dotnet, validation, designing-domain-models-where-invalid-states-are-unrepresentable-by-parsing-raw-input-into-strongly-typed-value-objects-at-system-boundaries-use-when-enforcing-invariants-through-the-type-system-rather-than-runtime-validation-checks
---

## Use `implicit operator` conversions from the value object to its primitive type

(e.g., `public static implicit operator string(EmailAddress e) => e.Value;`) for read-only access, but never define an implicit conversion from primitive to value object, as that would bypass the parsing step.
