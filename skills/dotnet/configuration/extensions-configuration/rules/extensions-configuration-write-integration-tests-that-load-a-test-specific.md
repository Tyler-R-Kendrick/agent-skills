---
title: "Write integration tests that load a test-specific..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-configuration, dotnet, configuration, loading-application-settings-from-json-files, environment-variables, command-line-arguments
---

## Write integration tests that load a test-specific...

Write integration tests that load a test-specific `appsettings.Testing.json` via `ConfigurationBuilder` to verify that options binding and validation work correctly with realistic values.
