---
title: "Enable `ThrowOnMappingNullMismatch`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: mapperly, dotnet, mapping, high-performance-object-mapping-via-source-generation, compile-time-mapping-validation, zero-reflection-mapping
---

## Enable `ThrowOnMappingNullMismatch`

Enable `ThrowOnMappingNullMismatch`: in the `[Mapper]` attribute during development to surface null-safety issues, then decide on production behavior based on your error-handling strategy.
