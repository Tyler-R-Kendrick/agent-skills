---
title: "Use `ForAttributeWithMetadataName` instead of `CreateSyntaxProvider` when filtering by attribute"
impact: MEDIUM
impactDescription: "general best practice"
tags: generators-cheatsheet, dotnet, project-system, building-incremental-source-generators-that-emit-c-code-at-compile-time, including-syntax-providers, semantic-model-queries
---

## Use `ForAttributeWithMetadataName` instead of `CreateSyntaxProvider` when filtering by attribute

Use `ForAttributeWithMetadataName` instead of `CreateSyntaxProvider` when filtering by attribute: because the compiler provides an optimized fast path that skips semantic model queries for files without the target attribute.
