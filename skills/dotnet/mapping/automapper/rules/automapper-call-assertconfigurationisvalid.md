---
title: "Call `AssertConfigurationIsValid()`"
impact: MEDIUM
impactDescription: "general best practice"
tags: automapper, dotnet, mapping, convention-based-object-to-object-mapping, profile-based-mapping-configuration, flatteningunflattening
---

## Call `AssertConfigurationIsValid()`

Call `AssertConfigurationIsValid()`: during application startup or in an integration test to catch missing member mappings, typos, and configuration errors before they cause runtime exceptions.
