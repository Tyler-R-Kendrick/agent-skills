---
title: "Return `PipelineResult` objects from the pipeline rather than throwing exceptions"
impact: MEDIUM
impactDescription: "general best practice"
tags: plastic, dotnet, validation, implementing-business-workflows-as-command-pipelines-using-the-plastic-librarys-command-pattern-use-when-orchestrating-multi-step-operations-with-validation, execution, and-rollback-semantics
---

## Return `PipelineResult` objects from the pipeline rather than throwing exceptions

Return `PipelineResult` objects from the pipeline rather than throwing exceptions: for business-rule failures, because pipeline failures are expected outcomes that should be communicated as structured responses; reserve exceptions for unexpected infrastructure errors.
