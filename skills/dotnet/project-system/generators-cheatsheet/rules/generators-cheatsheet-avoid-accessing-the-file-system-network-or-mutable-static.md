---
title: "Avoid accessing the file system, network, or mutable static state from within a generator"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: generators-cheatsheet, dotnet, project-system, building-incremental-source-generators-that-emit-c-code-at-compile-time, including-syntax-providers, semantic-model-queries
---

## Avoid accessing the file system, network, or mutable static state from within a generator

Avoid accessing the file system, network, or mutable static state from within a generator: because generators run in the compiler process and must be deterministic, thread-safe, and free of side effects.
