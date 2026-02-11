---
title: "Use `[MapEnum(EnumMappingStrategy.ByName)]`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: mapperly, dotnet, mapping, high-performance-object-mapping-via-source-generation, compile-time-mapping-validation, zero-reflection-mapping
---

## Use `[MapEnum(EnumMappingStrategy.ByName)]`

Use `[MapEnum(EnumMappingStrategy.ByName)]`: when source and destination enums have the same member names but different underlying values to avoid silent data corruption.
