---
title: "Use the `Microsoft.CodeAnalysis.Testing` framework for unit tests with the `VerifyAnalyzerAsync` pattern"
impact: MEDIUM
impactDescription: "general best practice"
tags: roslyn-analyzers, dotnet, project-system, writing-custom-roslyn-diagnostic-analyzers-and-code-fix-providers-that-report-warnings-and-errors-during-compilation, and-optionally-provide-automated-code-transformations
---

## Use the `Microsoft.CodeAnalysis.Testing` framework for unit tests with the `VerifyAnalyzerAsync` pattern

Use the `Microsoft.CodeAnalysis.Testing` framework for unit tests with the `VerifyAnalyzerAsync` pattern: which handles compilation setup, reference resolution, and diagnostic location matching automatically.
