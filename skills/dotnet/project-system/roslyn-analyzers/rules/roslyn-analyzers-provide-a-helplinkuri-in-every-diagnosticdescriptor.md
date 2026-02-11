---
title: "Provide a `helpLinkUri` in every `DiagnosticDescriptor`"
impact: MEDIUM
impactDescription: "general best practice"
tags: roslyn-analyzers, dotnet, project-system, writing-custom-roslyn-diagnostic-analyzers-and-code-fix-providers-that-report-warnings-and-errors-during-compilation, and-optionally-provide-automated-code-transformations
---

## Provide a `helpLinkUri` in every `DiagnosticDescriptor`

Provide a `helpLinkUri` in every `DiagnosticDescriptor`: that points to documentation explaining why the diagnostic is reported and how to fix it, so developers can understand the rule without reading analyzer source code.
