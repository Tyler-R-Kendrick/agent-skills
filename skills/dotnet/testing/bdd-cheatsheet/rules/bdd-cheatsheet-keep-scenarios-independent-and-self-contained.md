---
title: "Keep scenarios independent and self-contained"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: bdd-cheatsheet, dotnet, testing, writing-gherkin-feature-files, structuring-given-when-then-scenarios, creating-scenario-outlines-with-data-tables
---

## Keep scenarios independent and self-contained

Keep scenarios independent and self-contained: each scenario should set up its own preconditions in Given steps; never rely on another scenario having run first.
