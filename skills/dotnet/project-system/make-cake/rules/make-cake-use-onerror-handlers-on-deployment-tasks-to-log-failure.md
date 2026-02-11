---
title: "Use `OnError` handlers on deployment tasks to log failure details and re-throw"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: make-cake, dotnet, project-system, writing-cross-platform-build-automation-scripts-in-c-using-cake-c-make-for-compiling, testing, packaging
---

## Use `OnError` handlers on deployment tasks to log failure details and re-throw

Use `OnError` handlers on deployment tasks to log failure details and re-throw: to prevent silent deployment failures; combine with `WithCriteria` to skip deployment on pull request builds.
