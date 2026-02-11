---
title: "Create a separate `[*Tests/"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: editorconfig, dotnet, project-system, configuring-consistent-c-coding-styles, naming-conventions, formatting-rules
---

## Create a separate `[*Tests/

/*.cs]` section that relaxes rules like CA1707 and CA1062** because test methods conventionally use underscores in names and test parameters do not require null-guards.
