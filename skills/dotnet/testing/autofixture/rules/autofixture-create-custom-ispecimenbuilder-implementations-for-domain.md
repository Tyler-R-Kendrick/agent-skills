---
title: "Create custom `ISpecimenBuilder` implementations for domain rules"
impact: MEDIUM
impactDescription: "general best practice"
tags: autofixture, dotnet, testing, auto-generating-test-data-for-unit-tests, reducing-boilerplate-in-the-arrange-phase, creating-anonymous-objects-and-collections
---

## Create custom `ISpecimenBuilder` implementations for domain rules

Create custom `ISpecimenBuilder` implementations for domain rules: email formats, phone numbers, and currency constraints should be defined once in a builder and reused across all test projects.
