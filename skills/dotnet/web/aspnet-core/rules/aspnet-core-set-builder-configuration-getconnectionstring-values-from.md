---
title: "Set `builder.Configuration.GetConnectionString()` values from environment variables or Azure Key Vault in production"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspnet-core, dotnet, web, building-web-apis, web-applications, and-microservices-with-aspnet-core-use-for-minimal-apis
---

## Set `builder.Configuration.GetConnectionString()` values from environment variables or Azure Key Vault in production

Set `builder.Configuration.GetConnectionString()` values from environment variables or Azure Key Vault in production: rather than hardcoding them in `appsettings.json`, and use `builder.Configuration.AddUserSecrets<Program>()` for local development, ensuring secrets never appear in source control.
