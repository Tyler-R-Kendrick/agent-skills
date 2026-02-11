---
title: "Implement `Validate()` to check all preconditions before any side effects"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: plastic, dotnet, validation, implementing-business-workflows-as-command-pipelines-using-the-plastic-librarys-command-pattern-use-when-orchestrating-multi-step-operations-with-validation, execution, and-rollback-semantics
---

## Implement `Validate()` to check all preconditions before any side effects

Implement `Validate()` to check all preconditions before any side effects: and `Execute()` to perform the actual work, never mixing validation logic into `Execute()`; this separation ensures that calling `Validate()` alone is safe and idempotent for preview or dry-run scenarios.
