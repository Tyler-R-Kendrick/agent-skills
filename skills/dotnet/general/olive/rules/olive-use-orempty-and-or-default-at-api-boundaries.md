---
title: "Use `OrEmpty()` and `Or(\"default\")` at API boundaries"
impact: MEDIUM
impactDescription: "general best practice"
tags: olive, dotnet, general, common-string-extensions-null-safe-operations, validation, collection-utilities
---

## Use `OrEmpty()` and `Or("default")` at API boundaries

Use `OrEmpty()` and `Or("default")` at API boundaries: to convert nullable strings into safe values immediately, eliminating null-check boilerplate in downstream code.
