---
title: "Always define a dedicated options class with a `const..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-configuration, dotnet, configuration, loading-application-settings-from-json-files, environment-variables, command-line-arguments
---

## Always define a dedicated options class with a `const...

Always define a dedicated options class with a `const string SectionName` for each configuration section rather than reading `IConfiguration` keys directly in business logic.
