---
title: "Use numeric step indices starting from 0 in `[FluentMember]` to define the exact builder step order"
impact: MEDIUM
impactDescription: "general best practice"
tags: m31-fluentapi, dotnet, project-system, generating-type-safe-fluent-builder-apis-from-c-classes-using-source-generation, enforcing-required-property-ordering-and-compile-time-validation-of-builder-step-sequences
---

## Use numeric step indices starting from 0 in `[FluentMember]` to define the exact builder step order

Use numeric step indices starting from 0 in `[FluentMember]` to define the exact builder step order: because the generator uses these indices to create the interface chain; gaps in numbering are allowed and can ease future insertions.
