---
title: "Commit `FodyWeavers.xml` and `FodyWeavers.xsd` to version control"
impact: MEDIUM
impactDescription: "general best practice"
tags: fody, dotnet, project-system, il-weaving-at-build-time-to-inject-cross-cutting-concerns-such-as-inotifypropertychanged-implementation, null-guard-checks, method-timing
---

## Commit `FodyWeavers.xml` and `FodyWeavers.xsd` to version control

Commit `FodyWeavers.xml` and `FodyWeavers.xsd` to version control: so that all developers and CI agents use the same weaver configuration; the XSD file is auto-generated and enables IntelliSense in XML editors.
