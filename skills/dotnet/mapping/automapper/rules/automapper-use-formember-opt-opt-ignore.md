---
title: "Use `ForMember(..., opt => opt.Ignore())`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: automapper, dotnet, mapping, convention-based-object-to-object-mapping, profile-based-mapping-configuration, flatteningunflattening
---

## Use `ForMember(..., opt => opt.Ignore())`

Use `ForMember(..., opt => opt.Ignore())`: explicitly for destination properties that should not be mapped (e.g., `Id` on creation DTOs) to prevent `AssertConfigurationIsValid` from flagging them as unmapped.
