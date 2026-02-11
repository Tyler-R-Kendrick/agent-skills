---
title: "Parse all inputs at the system boundary (API controller, message handler, CLI parser)"
impact: MEDIUM
impactDescription: "general best practice"
tags: parse-dont-validate, dotnet, validation, designing-domain-models-where-invalid-states-are-unrepresentable-by-parsing-raw-input-into-strongly-typed-value-objects-at-system-boundaries-use-when-enforcing-invariants-through-the-type-system-rather-than-runtime-validation-checks
---

## Parse all inputs at the system boundary (API controller, message handler, CLI parser)

Parse all inputs at the system boundary (API controller, message handler, CLI parser): and pass only parsed domain types to the service and domain layers; if a service method accepts `string email` instead of `EmailAddress email`, any caller can bypass validation.
