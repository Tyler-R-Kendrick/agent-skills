---
title: "Log the start and completion of each command in the pipeline"
impact: MEDIUM
impactDescription: "general best practice"
tags: plastic, dotnet, validation, implementing-business-workflows-as-command-pipelines-using-the-plastic-librarys-command-pattern-use-when-orchestrating-multi-step-operations-with-validation, execution, and-rollback-semantics
---

## Log the start and completion of each command in the pipeline

Log the start and completion of each command in the pipeline: with the command class name and duration, so that pipeline failures can be diagnosed by examining which command succeeded and which failed, without stepping through the entire pipeline in a debugger.
