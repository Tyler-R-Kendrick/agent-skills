---
title: "Measure build-time impact when adding multiple weavers"
impact: MEDIUM
impactDescription: "general best practice"
tags: fody, dotnet, project-system, il-weaving-at-build-time-to-inject-cross-cutting-concerns-such-as-inotifypropertychanged-implementation, null-guard-checks, method-timing
---

## Measure build-time impact when adding multiple weavers

Measure build-time impact when adding multiple weavers: by enabling MSBuild binary logging (`dotnet build -bl`) and inspecting the Fody target duration; each weaver loads and scans the entire assembly.
