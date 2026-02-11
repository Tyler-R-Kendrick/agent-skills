---
title: "Pin the M31.FluentApi package version in `Directory.Packages.props`"
impact: MEDIUM
impactDescription: "general best practice"
tags: m31-fluentapi, dotnet, project-system, generating-type-safe-fluent-builder-apis-from-c-classes-using-source-generation, enforcing-required-property-ordering-and-compile-time-validation-of-builder-step-sequences
---

## Pin the M31.FluentApi package version in `Directory.Packages.props`

Pin the M31.FluentApi package version in `Directory.Packages.props`: because source generator output can change between versions; unpinned versions may cause build breaks when a new generator version changes the output shape.
