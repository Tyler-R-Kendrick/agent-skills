---
title: "Check `result.AnyErrors` before accessing `result.MessageMap`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: validot, dotnet, validation, defining-high-performance-validation-specifications-using-validots-fluent-specification-builder-use-when-you-need-allocation-free-validation-with-reusable-specifications, fast-execution, and-detailed-error-output
---

## Check `result.AnyErrors` before accessing `result.MessageMap`

Check `result.AnyErrors` before accessing `result.MessageMap`: to avoid unnecessary enumeration; `AnyErrors` is a fast boolean check that does not allocate, while `MessageMap` builds a dictionary on access.
