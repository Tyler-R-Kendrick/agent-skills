---
title: "Mark optional properties with `[FluentNullableMember]` instead of providing default values"
impact: MEDIUM
impactDescription: "general best practice"
tags: m31-fluentapi, dotnet, project-system, generating-type-safe-fluent-builder-apis-from-c-classes-using-source-generation, enforcing-required-property-ordering-and-compile-time-validation-of-builder-step-sequences
---

## Mark optional properties with `[FluentNullableMember]` instead of providing default values

Mark optional properties with `[FluentNullableMember]` instead of providing default values: so that the generated builder exposes both a `WithX(value)` method and a `WithoutX()` skip method, making the optionality explicit to consumers.
