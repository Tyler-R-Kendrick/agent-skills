---
title: "Make all predicate and transform lambdas `static`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: generators-cheatsheet, dotnet, project-system, building-incremental-source-generators-that-emit-c-code-at-compile-time, including-syntax-providers, semantic-model-queries
---

## Make all predicate and transform lambdas `static`

Make all predicate and transform lambdas `static`: to avoid closure allocations that create new delegate instances on every invocation; the compiler will error with `EnforceExtendedAnalyzerRules` if closures are detected.
