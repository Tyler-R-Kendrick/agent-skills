---
title: "Specify only test-relevant data with `Build<T>().With()`"
impact: MEDIUM
impactDescription: "general best practice"
tags: autofixture, dotnet, testing, auto-generating-test-data-for-unit-tests, reducing-boilerplate-in-the-arrange-phase, creating-anonymous-objects-and-collections
---

## Specify only test-relevant data with `Build<T>().With()`

Specify only test-relevant data with `Build<T>().With()`: let AutoFixture generate all other properties; tests that over-specify data become brittle and hard to read.
