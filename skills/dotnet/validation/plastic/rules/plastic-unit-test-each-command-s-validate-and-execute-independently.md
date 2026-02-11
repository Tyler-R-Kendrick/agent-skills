---
title: "Unit test each command's `Validate()` and `Execute()` independently"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: plastic, dotnet, validation, implementing-business-workflows-as-command-pipelines-using-the-plastic-librarys-command-pattern-use-when-orchestrating-multi-step-operations-with-validation, execution, and-rollback-semantics
---

## Unit test each command's `Validate()` and `Execute()` independently

Unit test each command's `Validate()` and `Execute()` independently: by mocking dependencies and asserting on `IsValid`, `ErrorMessage`, and `Result`, then test the pipeline composition with integration tests that verify the full sequence including rollback.
