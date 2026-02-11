---
title: "Store undo state in the command instance"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: plastic, dotnet, validation, implementing-business-workflows-as-command-pipelines-using-the-plastic-librarys-command-pattern-use-when-orchestrating-multi-step-operations-with-validation, execution, and-rollback-semantics
---

## Store undo state in the command instance

(e.g., `_reservations`, `_transactionId`) during `Execute()` so that `Rollback()` has the information it needs; do not rely on re-querying the database for rollback data because the state may have changed between execution and rollback.
