---
title: "Never use AutoFixture-generated data for integration or contract tests"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: autofixture, dotnet, testing, auto-generating-test-data-for-unit-tests, reducing-boilerplate-in-the-arrange-phase, creating-anonymous-objects-and-collections
---

## Never use AutoFixture-generated data for integration or contract tests

Never use AutoFixture-generated data for integration or contract tests: auto-generated values are anonymous and unpredictable; integration tests should use explicit, deterministic test data.
