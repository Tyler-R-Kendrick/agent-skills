---
title: "Create separate command classes for each discrete side effect"
impact: MEDIUM
impactDescription: "general best practice"
tags: plastic, dotnet, validation, implementing-business-workflows-as-command-pipelines-using-the-plastic-librarys-command-pattern-use-when-orchestrating-multi-step-operations-with-validation, execution, and-rollback-semantics
---

## Create separate command classes for each discrete side effect

(e.g., `ReserveInventoryCommand`, `ChargePaymentCommand`, `SendConfirmationEmailCommand`) rather than combining multiple operations in a single command, so that each command's rollback logic is clear and self-contained.
