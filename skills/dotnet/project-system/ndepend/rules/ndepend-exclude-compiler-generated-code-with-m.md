---
title: "Exclude compiler-generated code with `!m.IsGeneratedByCompiler` in all CQLinq queries"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: ndepend, dotnet, project-system, static-analysis-of-net-assemblies-including-code-metrics, dependency-graphs, architecture-validation-rules
---

## Exclude compiler-generated code with `!m.IsGeneratedByCompiler` in all CQLinq queries

Exclude compiler-generated code with `!m.IsGeneratedByCompiler` in all CQLinq queries: to prevent false positives from async state machines, LINQ expression trees, record types, and source-generated code.
