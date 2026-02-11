---
title: "Use `RegisterSymbolAction` for naming and accessibility rules, `RegisterSyntaxNodeAction` for pattern detection, and `RegisterOperationAction` for semantic analysis"
impact: MEDIUM
impactDescription: "general best practice"
tags: roslyn-analyzers, dotnet, project-system, writing-custom-roslyn-diagnostic-analyzers-and-code-fix-providers-that-report-warnings-and-errors-during-compilation, and-optionally-provide-automated-code-transformations
---

## Use `RegisterSymbolAction` for naming and accessibility rules, `RegisterSyntaxNodeAction` for pattern detection, and `RegisterOperationAction` for semantic analysis

Use `RegisterSymbolAction` for naming and accessibility rules, `RegisterSyntaxNodeAction` for pattern detection, and `RegisterOperationAction` for semantic analysis: to match the right level of abstraction to the analysis task.
