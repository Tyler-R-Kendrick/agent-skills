---
title: "Use `WithCriteria` to conditionally skip tasks instead of wrapping task bodies in if-statements"
impact: MEDIUM
impactDescription: "general best practice"
tags: make-cake, dotnet, project-system, writing-cross-platform-build-automation-scripts-in-c-using-cake-c-make-for-compiling, testing, packaging
---

## Use `WithCriteria` to conditionally skip tasks instead of wrapping task bodies in if-statements

Use `WithCriteria` to conditionally skip tasks instead of wrapping task bodies in if-statements: so that Cake's task runner reports skipped tasks in the output log and the dependency graph remains clear.
