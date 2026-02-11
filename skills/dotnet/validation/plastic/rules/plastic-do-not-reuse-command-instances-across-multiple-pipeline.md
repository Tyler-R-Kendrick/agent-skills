---
title: "Do not reuse command instances across multiple pipeline executions"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: plastic, dotnet, validation, implementing-business-workflows-as-command-pipelines-using-the-plastic-librarys-command-pattern-use-when-orchestrating-multi-step-operations-with-validation, execution, and-rollback-semantics
---

## Do not reuse command instances across multiple pipeline executions

Do not reuse command instances across multiple pipeline executions: because commands store internal state (validation results, execution state, rollback data) from the previous run; create fresh command instances for each pipeline execution to avoid stale state leaking between runs.
