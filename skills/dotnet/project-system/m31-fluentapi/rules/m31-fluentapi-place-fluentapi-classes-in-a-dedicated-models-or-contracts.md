---
title: "Place `[FluentApi]` classes in a dedicated `Models` or `Contracts` namespace"
impact: MEDIUM
impactDescription: "general best practice"
tags: m31-fluentapi, dotnet, project-system, generating-type-safe-fluent-builder-apis-from-c-classes-using-source-generation, enforcing-required-property-ordering-and-compile-time-validation-of-builder-step-sequences
---

## Place `[FluentApi]` classes in a dedicated `Models` or `Contracts` namespace

Place `[FluentApi]` classes in a dedicated `Models` or `Contracts` namespace: to keep generated builder classes (which are named `Create{ClassName}`) organized and discoverable without polluting service or handler namespaces.
