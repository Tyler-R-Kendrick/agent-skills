---
title: "Use `throwConfigExceptions=\"true\"`"
impact: MEDIUM
impactDescription: "general best practice"
tags: nlog, dotnet, logging, nlog-target-configuration, layout-renderers, structured-logging-with-nlog
---

## Use `throwConfigExceptions="true"`

Use `throwConfigExceptions="true"`: during development to catch configuration errors (typos in target names, invalid layout renderers) at startup rather than silently losing logs.
