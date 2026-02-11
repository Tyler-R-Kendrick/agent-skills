---
title: "Combine with AutoMapper only when you need `ProjectTo`"
impact: MEDIUM
impactDescription: "general best practice"
tags: mapperly, dotnet, mapping, high-performance-object-mapping-via-source-generation, compile-time-mapping-validation, zero-reflection-mapping
---

## Combine with AutoMapper only when you need `ProjectTo`

Combine with AutoMapper only when you need `ProjectTo`: for EF Core queries; use Mapperly for in-memory object mapping and AutoMapper exclusively for IQueryable projection.
