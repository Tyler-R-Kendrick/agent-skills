---
title: "Write unit tests that instantiate the validator, pass both valid and invalid objects, and assert on `result.AnyErrors` and specific paths in `result.MessageMap`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: validot, dotnet, validation, defining-high-performance-validation-specifications-using-validots-fluent-specification-builder-use-when-you-need-allocation-free-validation-with-reusable-specifications, fast-execution, and-detailed-error-output
---

## Write unit tests that instantiate the validator, pass both valid and invalid objects, and assert on `result.AnyErrors` and specific paths in `result.MessageMap`

, verifying that each rule produces the expected error at the expected path; do not rely solely on integration tests through the HTTP pipeline.
