---
title: "Prefer `IMapper` injection"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: automapper, dotnet, mapping, convention-based-object-to-object-mapping, profile-based-mapping-configuration, flatteningunflattening
---

## Prefer `IMapper` injection

Prefer `IMapper` injection: over `Mapper.Map` static calls so mappings are testable with mock/stub implementations and do not rely on global state.
