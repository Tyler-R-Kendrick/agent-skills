---
title: "Emit the marker attribute via `RegisterPostInitializationOutput`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: generators-cheatsheet, dotnet, project-system, building-incremental-source-generators-that-emit-c-code-at-compile-time, including-syntax-providers, semantic-model-queries
---

## Emit the marker attribute via `RegisterPostInitializationOutput`

Emit the marker attribute via `RegisterPostInitializationOutput`: so that user code can reference the attribute without a separate shared project; this source is injected before the main compilation and is always available.
