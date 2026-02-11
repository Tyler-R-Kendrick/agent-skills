---
title: "Use `[AutoData]` and `[InlineAutoData]` for xUnit theories"
impact: MEDIUM
impactDescription: "general best practice"
tags: autofixture, dotnet, testing, auto-generating-test-data-for-unit-tests, reducing-boilerplate-in-the-arrange-phase, creating-anonymous-objects-and-collections
---

## Use `[AutoData]` and `[InlineAutoData]` for xUnit theories

Use `[AutoData]` and `[InlineAutoData]` for xUnit theories: this eliminates the need for `new Fixture()` in every test method and makes test parameters self-documenting.
