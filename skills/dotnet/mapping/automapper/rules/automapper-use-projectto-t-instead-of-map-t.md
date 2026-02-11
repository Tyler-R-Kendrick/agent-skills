---
title: "Use `ProjectTo<T>()` instead of `Map<T>()`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: automapper, dotnet, mapping, convention-based-object-to-object-mapping, profile-based-mapping-configuration, flatteningunflattening
---

## Use `ProjectTo<T>()` instead of `Map<T>()`

Use `ProjectTo<T>()` instead of `Map<T>()`: when querying with EF Core to generate efficient SQL that selects only the mapped columns, avoiding N+1 queries and unnecessary data loading.
