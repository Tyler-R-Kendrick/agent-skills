---
title: "Use `.Optional()` on nullable or optional members"
impact: MEDIUM
impactDescription: "general best practice"
tags: validot, dotnet, validation, defining-high-performance-validation-specifications-using-validots-fluent-specification-builder-use-when-you-need-allocation-free-validation-with-reusable-specifications, fast-execution, and-detailed-error-output
---

## Use `.Optional()` on nullable or optional members

Use `.Optional()` on nullable or optional members: before applying further rules, so that null values pass validation without triggering subsequent rules; without `.Optional()`, a null `Notes` field would fail a `.MaxLength()` check with a confusing null reference error.
