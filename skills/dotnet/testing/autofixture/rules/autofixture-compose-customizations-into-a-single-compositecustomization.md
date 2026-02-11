---
title: "Compose customizations into a single `CompositeCustomization`"
impact: MEDIUM
impactDescription: "general best practice"
tags: autofixture, dotnet, testing, auto-generating-test-data-for-unit-tests, reducing-boilerplate-in-the-arrange-phase, creating-anonymous-objects-and-collections
---

## Compose customizations into a single `CompositeCustomization`

Compose customizations into a single `CompositeCustomization`: bundle related customizations (AutoMoq + domain rules + date overrides) into one reusable class for consistent fixtures across the test project.
