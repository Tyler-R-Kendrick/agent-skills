---
title: "Use `[MapperIgnoreSource]` and `[MapperIgnoreTarget]`"
impact: MEDIUM
impactDescription: "general best practice"
tags: mapperly, dotnet, mapping, high-performance-object-mapping-via-source-generation, compile-time-mapping-validation, zero-reflection-mapping
---

## Use `[MapperIgnoreSource]` and `[MapperIgnoreTarget]`

Use `[MapperIgnoreSource]` and `[MapperIgnoreTarget]`: to explicitly suppress warnings for properties that should not be mapped, such as `PasswordHash` or computed fields.
