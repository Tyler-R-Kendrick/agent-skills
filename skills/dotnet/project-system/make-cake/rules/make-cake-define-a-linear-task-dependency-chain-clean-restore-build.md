---
title: "Define a linear task dependency chain (Clean -> Restore -> Build -> Test -> Pack -> Deploy)"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: make-cake, dotnet, project-system, writing-cross-platform-build-automation-scripts-in-c-using-cake-c-make-for-compiling, testing, packaging
---

## Define a linear task dependency chain (Clean -> Restore -> Build -> Test -> Pack -> Deploy)

Define a linear task dependency chain (Clean -> Restore -> Build -> Test -> Pack -> Deploy): to ensure each step can assume the previous step completed successfully; use `IsDependentOn` to declare the graph explicitly.
