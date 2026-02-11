---
title: "Use `fixture.Register<T>()` for types with no public constructor"
impact: MEDIUM
impactDescription: "general best practice"
tags: autofixture, dotnet, testing, auto-generating-test-data-for-unit-tests, reducing-boilerplate-in-the-arrange-phase, creating-anonymous-objects-and-collections
---

## Use `fixture.Register<T>()` for types with no public constructor

Use `fixture.Register<T>()` for types with no public constructor: register a factory delegate for abstract types, sealed types with private constructors, or types that need specific initialization.
