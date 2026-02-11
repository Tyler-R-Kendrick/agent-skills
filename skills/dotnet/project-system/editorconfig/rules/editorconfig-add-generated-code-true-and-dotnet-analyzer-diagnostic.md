---
title: "Add `generated_code = true` and `dotnet_analyzer_diagnostic.severity = none` for `obj` and auto-generated file globs"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: editorconfig, dotnet, project-system, configuring-consistent-c-coding-styles, naming-conventions, formatting-rules
---

## Add `generated_code = true` and `dotnet_analyzer_diagnostic.severity = none` for `obj` and auto-generated file globs

Add `generated_code = true` and `dotnet_analyzer_diagnostic.severity = none` for `obj` and auto-generated file globs: to prevent analyzers from reporting false positives on machine-generated code.
