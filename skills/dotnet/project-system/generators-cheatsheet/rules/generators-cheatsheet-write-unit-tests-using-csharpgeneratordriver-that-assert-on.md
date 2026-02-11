---
title: "Write unit tests using `CSharpGeneratorDriver` that assert on both generated source content and diagnostics"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: generators-cheatsheet, dotnet, project-system, building-incremental-source-generators-that-emit-c-code-at-compile-time, including-syntax-providers, semantic-model-queries
---

## Write unit tests using `CSharpGeneratorDriver` that assert on both generated source content and diagnostics

Write unit tests using `CSharpGeneratorDriver` that assert on both generated source content and diagnostics: to prevent regressions; test edge cases like missing partial modifier, empty classes, and nested types.
