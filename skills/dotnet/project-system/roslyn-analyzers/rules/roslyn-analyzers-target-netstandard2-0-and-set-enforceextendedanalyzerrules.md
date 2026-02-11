---
title: "Target `netstandard2.0` and set `EnforceExtendedAnalyzerRules` to `true`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: roslyn-analyzers, dotnet, project-system, writing-custom-roslyn-diagnostic-analyzers-and-code-fix-providers-that-report-warnings-and-errors-during-compilation, and-optionally-provide-automated-code-transformations
---

## Target `netstandard2.0` and set `EnforceExtendedAnalyzerRules` to `true`

Target `netstandard2.0` and set `EnforceExtendedAnalyzerRules` to `true`: because the compiler loads analyzers in a restricted context; this setting surfaces violations of analyzer design rules at build time.
