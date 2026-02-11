---
title: "Use context injection instead of static state"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: bdd-cheatsheet, dotnet, testing, writing-gherkin-feature-files, structuring-given-when-then-scenarios, creating-scenario-outlines-with-data-tables
---

## Use context injection instead of static state

Use context injection instead of static state: share data between step definitions via constructor-injected context objects, not static fields or ScenarioContext dictionary lookups.
