---
title: "Set `EnforceCodeStyleInBuild` to `true` in `Directory.Build.props`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: editorconfig, dotnet, project-system, configuring-consistent-c-coding-styles, naming-conventions, formatting-rules
---

## Set `EnforceCodeStyleInBuild` to `true` in `Directory.Build.props`

Set `EnforceCodeStyleInBuild` to `true` in `Directory.Build.props`: so that code-style rules defined in `.editorconfig` are enforced during `dotnet build`, not only inside the IDE.
