---
title: "Order commands in the pipeline from least-side-effectful to most-side-effectful"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: plastic, dotnet, validation, implementing-business-workflows-as-command-pipelines-using-the-plastic-librarys-command-pattern-use-when-orchestrating-multi-step-operations-with-validation, execution, and-rollback-semantics
---

## Order commands in the pipeline from least-side-effectful to most-side-effectful

(validate-only commands first, then database writes, then external API calls like payment charges last), minimizing the number of commands that need rollback when a late-stage command fails.
