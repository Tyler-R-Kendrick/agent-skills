---
title: "Use `Freeze<T>()` to share a single instance across the test"
impact: MEDIUM
impactDescription: "general best practice"
tags: autofixture, dotnet, testing, auto-generating-test-data-for-unit-tests, reducing-boilerplate-in-the-arrange-phase, creating-anonymous-objects-and-collections
---

## Use `Freeze<T>()` to share a single instance across the test

Use `Freeze<T>()` to share a single instance across the test: freeze the type that your system-under-test depends on so the same instance is injected both into the SUT and available for assertions.
