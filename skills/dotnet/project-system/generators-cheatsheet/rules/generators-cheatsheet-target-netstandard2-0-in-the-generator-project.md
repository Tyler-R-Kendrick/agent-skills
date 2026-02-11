---
title: "Target `netstandard2.0` in the generator project"
impact: MEDIUM
impactDescription: "general best practice"
tags: generators-cheatsheet, dotnet, project-system, building-incremental-source-generators-that-emit-c-code-at-compile-time, including-syntax-providers, semantic-model-queries
---

## Target `netstandard2.0` in the generator project

Target `netstandard2.0` in the generator project: because the Roslyn compiler host loads analyzers and generators in a `netstandard2.0` context regardless of the consuming project's target framework.
