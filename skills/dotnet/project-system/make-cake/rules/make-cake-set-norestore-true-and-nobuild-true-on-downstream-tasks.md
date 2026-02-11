---
title: "Set `NoRestore = true` and `NoBuild = true` on downstream tasks"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: make-cake, dotnet, project-system, writing-cross-platform-build-automation-scripts-in-c-using-cake-c-make-for-compiling, testing, packaging
---

## Set `NoRestore = true` and `NoBuild = true` on downstream tasks

Set `NoRestore = true` and `NoBuild = true` on downstream tasks: after the Restore and Build tasks have run to avoid redundant restore and compilation passes that slow down the build pipeline.
