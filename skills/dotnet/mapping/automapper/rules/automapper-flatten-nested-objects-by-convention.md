---
title: "Flatten nested objects by convention"
impact: MEDIUM
impactDescription: "general best practice"
tags: automapper, dotnet, mapping, convention-based-object-to-object-mapping, profile-based-mapping-configuration, flatteningunflattening
---

## Flatten nested objects by convention

(AutoMapper automatically maps `src.Customer.Name` to `dest.CustomerName`) and only use `ForMember` when the convention does not apply.
