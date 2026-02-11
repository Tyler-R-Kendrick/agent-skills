---
title: "Share state between step classes via a scoped context object"
impact: MEDIUM
impactDescription: "general best practice"
tags: reqnroll, dotnet, testing, behavior-driven-development-with-gherkin-syntax, writing-executable-specifications, step-definition-bindings
---

## Share state between step classes via a scoped context object

Share state between step classes via a scoped context object: create a typed context class (e.g., `OrderContext`) registered as scoped, not by using `ScenarioContext` dictionary lookups.
