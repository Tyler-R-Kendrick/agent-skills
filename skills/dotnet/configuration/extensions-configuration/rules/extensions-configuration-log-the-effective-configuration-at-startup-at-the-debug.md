---
title: "Log the effective configuration at startup at the `Debug`..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-configuration, dotnet, configuration, loading-application-settings-from-json-files, environment-variables, command-line-arguments
---

## Log the effective configuration at startup at the `Debug`...

Log the effective configuration at startup at the `Debug` level (excluding secrets) so that misconfigured deployments can be diagnosed from logs without SSH access.
