---
title: "Avoid placing business logic inside mapping profiles"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: automapper, dotnet, mapping, convention-based-object-to-object-mapping, profile-based-mapping-configuration, flatteningunflattening
---

## Avoid placing business logic inside mapping profiles

; mappings should be pure data transformations. Complex logic belongs in service classes that call the mapper.
