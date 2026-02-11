---
title: "Return value types or records with value equality from transform steps"
impact: MEDIUM
impactDescription: "general best practice"
tags: generators-cheatsheet, dotnet, project-system, building-incremental-source-generators-that-emit-c-code-at-compile-time, including-syntax-providers, semantic-model-queries
---

## Return value types or records with value equality from transform steps

Return value types or records with value equality from transform steps: so that the incremental pipeline's equality comparison can correctly detect unchanged inputs and skip regeneration.
