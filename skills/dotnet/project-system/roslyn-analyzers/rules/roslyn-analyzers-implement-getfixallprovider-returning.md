---
title: "Implement `GetFixAllProvider()` returning `WellKnownFixAllProviders.BatchFixer` in code fix providers"
impact: MEDIUM
impactDescription: "general best practice"
tags: roslyn-analyzers, dotnet, project-system, writing-custom-roslyn-diagnostic-analyzers-and-code-fix-providers-that-report-warnings-and-errors-during-compilation, and-optionally-provide-automated-code-transformations
---

## Implement `GetFixAllProvider()` returning `WellKnownFixAllProviders.BatchFixer` in code fix providers

Implement `GetFixAllProvider()` returning `WellKnownFixAllProviders.BatchFixer` in code fix providers: so that users can fix all instances of a diagnostic across a document, project, or solution in a single action.
