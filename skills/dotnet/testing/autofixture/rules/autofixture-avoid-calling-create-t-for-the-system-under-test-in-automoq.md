---
title: "Avoid calling `Create<T>()` for the system-under-test in AutoMoq tests"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: autofixture, dotnet, testing, auto-generating-test-data-for-unit-tests, reducing-boilerplate-in-the-arrange-phase, creating-anonymous-objects-and-collections
---

## Avoid calling `Create<T>()` for the system-under-test in AutoMoq tests

Avoid calling `Create<T>()` for the system-under-test in AutoMoq tests: let `_fixture.Create<MyService>()` build the SUT so all constructor dependencies are automatically resolved from frozen mocks.
