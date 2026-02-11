---
title: "Call `ValidateDataAnnotations()"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-configuration, dotnet, configuration, loading-application-settings-from-json-files, environment-variables, command-line-arguments
---

## Call `ValidateDataAnnotations()

Call `ValidateDataAnnotations().ValidateOnStart()` on every options registration so that missing or malformed configuration causes an immediate startup failure instead of a runtime error.
