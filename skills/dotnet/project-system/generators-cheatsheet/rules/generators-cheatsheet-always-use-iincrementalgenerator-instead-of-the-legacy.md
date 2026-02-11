---
title: "Always use `IIncrementalGenerator` instead of the legacy `ISourceGenerator` API"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: generators-cheatsheet, dotnet, project-system, building-incremental-source-generators-that-emit-c-code-at-compile-time, including-syntax-providers, semantic-model-queries
---

## Always use `IIncrementalGenerator` instead of the legacy `ISourceGenerator` API

Always use `IIncrementalGenerator` instead of the legacy `ISourceGenerator` API: because the incremental pipeline caches intermediate results and only regenerates when inputs change, preventing IDE lag during typing.
