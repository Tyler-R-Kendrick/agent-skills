---
title: "Use dependency injection for all step definition dependencies"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: reqnroll, dotnet, testing, behavior-driven-development-with-gherkin-syntax, writing-executable-specifications, step-definition-bindings
---

## Use dependency injection for all step definition dependencies

Use dependency injection for all step definition dependencies: register services with `[ScenarioDependencies]` and inject them via constructors instead of creating instances in step methods.
