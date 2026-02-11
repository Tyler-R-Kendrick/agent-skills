---
title: "Provide custom non-partial methods"
impact: MEDIUM
impactDescription: "general best practice"
tags: mapperly, dotnet, mapping, high-performance-object-mapping-via-source-generation, compile-time-mapping-validation, zero-reflection-mapping
---

## Provide custom non-partial methods

Provide custom non-partial methods: for complex value transformations (e.g., `Money` to `string`, `DateTimeOffset` to formatted string) and Mapperly will automatically use them for matching types.
