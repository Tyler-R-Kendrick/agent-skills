---
title: "Use `[StepArgumentTransformation]` for complex parameter types"
impact: MEDIUM
impactDescription: "general best practice"
tags: reqnroll, dotnet, testing, behavior-driven-development-with-gherkin-syntax, writing-executable-specifications, step-definition-bindings
---

## Use `[StepArgumentTransformation]` for complex parameter types

Use `[StepArgumentTransformation]` for complex parameter types: transform `$99.99` into `decimal` or table rows into domain objects to keep step methods clean and focused on behavior.
