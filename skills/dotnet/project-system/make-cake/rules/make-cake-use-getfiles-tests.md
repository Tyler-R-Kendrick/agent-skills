---
title: "Use `GetFiles(\"./tests/"
impact: MEDIUM
impactDescription: "general best practice"
tags: make-cake, dotnet, project-system, writing-cross-platform-build-automation-scripts-in-c-using-cake-c-make-for-compiling, testing, packaging
---

## Use `GetFiles("./tests/

/*.csproj")` with glob patterns to discover test projects dynamically** rather than listing each project path manually, so that new test projects are automatically included without script changes.
