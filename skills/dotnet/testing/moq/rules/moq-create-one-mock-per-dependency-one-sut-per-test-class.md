---
title: "Create one mock per dependency, one SUT per test class"
impact: MEDIUM
impactDescription: "general best practice"
tags: moq, dotnet, testing, creating-mock-objects-for-interfaces, stubbing-method-return-values, verifying-method-invocations
---

## Create one mock per dependency, one SUT per test class

Create one mock per dependency, one SUT per test class: instantiate mocks and the system-under-test in the constructor so each test starts with a clean state.
