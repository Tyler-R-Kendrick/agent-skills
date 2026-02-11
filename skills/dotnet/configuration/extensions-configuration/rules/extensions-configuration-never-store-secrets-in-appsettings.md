---
title: "Never store secrets in `appsettings"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-configuration, dotnet, configuration, loading-application-settings-from-json-files, environment-variables, command-line-arguments
---

## Never store secrets in `appsettings

Never store secrets in `appsettings.json`; use user secrets for development, environment variables for CI/CD, and Azure Key Vault or a similar vault for production.
