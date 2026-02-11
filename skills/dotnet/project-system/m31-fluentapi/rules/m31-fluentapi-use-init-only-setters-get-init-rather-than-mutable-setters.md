---
title: "Use `init`-only setters (`{ get; init; }`) rather than mutable setters (`{ get; set; }`)"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: m31-fluentapi, dotnet, project-system, generating-type-safe-fluent-builder-apis-from-c-classes-using-source-generation, enforcing-required-property-ordering-and-compile-time-validation-of-builder-step-sequences
---

## Use `init`-only setters (`{ get; init; }`) rather than mutable setters (`{ get; set; }`)

Use `init`-only setters (`{ get; init; }`) rather than mutable setters (`{ get; set; }`): to make constructed objects immutable after the builder completes, preventing accidental mutation after construction.
