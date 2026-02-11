---
title: "Implement `IRollbackable` on every command that produces side effects"
impact: MEDIUM
impactDescription: "general best practice"
tags: plastic, dotnet, validation, implementing-business-workflows-as-command-pipelines-using-the-plastic-librarys-command-pattern-use-when-orchestrating-multi-step-operations-with-validation, execution, and-rollback-semantics
---

## Implement `IRollbackable` on every command that produces side effects

(database writes, payment charges, inventory decrements, external API calls) and track the state needed to undo those effects, so the pipeline can restore consistency when a later command fails.
