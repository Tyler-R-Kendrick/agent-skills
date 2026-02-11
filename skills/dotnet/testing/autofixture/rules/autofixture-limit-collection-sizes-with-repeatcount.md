---
title: "Limit collection sizes with `RepeatCount`"
impact: MEDIUM
impactDescription: "general best practice"
tags: autofixture, dotnet, testing, auto-generating-test-data-for-unit-tests, reducing-boilerplate-in-the-arrange-phase, creating-anonymous-objects-and-collections
---

## Limit collection sizes with `RepeatCount`

Limit collection sizes with `RepeatCount`: set `fixture.RepeatCount = 5` or use `CreateMany<T>(count)` to control generated collection sizes and keep tests fast.
