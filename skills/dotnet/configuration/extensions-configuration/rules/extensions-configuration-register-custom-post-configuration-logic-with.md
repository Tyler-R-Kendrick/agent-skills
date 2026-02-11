---
title: "Register custom post-configuration logic with..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-configuration, dotnet, configuration, loading-application-settings-from-json-files, environment-variables, command-line-arguments
---

## Register custom post-configuration logic with...

Register custom post-configuration logic with `PostConfigure<T>` to compute derived values or apply defaults that depend on other options, keeping the options class itself free of logic.
