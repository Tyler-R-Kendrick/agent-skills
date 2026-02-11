---
title: "Use the pipeline pattern for multi-step workflows (order fulfillment, user registration, batch processing)"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: plastic, dotnet, validation, implementing-business-workflows-as-command-pipelines-using-the-plastic-librarys-command-pattern-use-when-orchestrating-multi-step-operations-with-validation, execution, and-rollback-semantics
---

## Use the pipeline pattern for multi-step workflows (order fulfillment, user registration, batch processing)

Use the pipeline pattern for multi-step workflows (order fulfillment, user registration, batch processing): that involve multiple repositories or external services, but do not use it for single-step operations where a simple service method with Guard clauses is sufficient.
