---
title: "Pass build parameters via `Argument(\"name\", defaultValue)` rather than hardcoding values"
impact: MEDIUM
impactDescription: "general best practice"
tags: make-cake, dotnet, project-system, writing-cross-platform-build-automation-scripts-in-c-using-cake-c-make-for-compiling, testing, packaging
---

## Pass build parameters via `Argument("name", defaultValue)` rather than hardcoding values

Pass build parameters via `Argument("name", defaultValue)` rather than hardcoding values: so that CI pipelines and developers can override configuration, target framework, and version from the command line.
