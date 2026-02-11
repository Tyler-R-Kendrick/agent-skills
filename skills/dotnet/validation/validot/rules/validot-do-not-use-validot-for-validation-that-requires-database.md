---
title: "Do not use Validot for validation that requires database lookups or external API calls"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: validot, dotnet, validation, defining-high-performance-validation-specifications-using-validots-fluent-specification-builder-use-when-you-need-allocation-free-validation-with-reusable-specifications, fast-execution, and-detailed-error-output
---

## Do not use Validot for validation that requires database lookups or external API calls

Do not use Validot for validation that requires database lookups or external API calls: because Validot's validation pipeline is synchronous; use FluentValidation with `MustAsync` for rules that need async I/O, or split validation into a synchronous Validot pass for format checks and a separate async service call for uniqueness/existence checks.
