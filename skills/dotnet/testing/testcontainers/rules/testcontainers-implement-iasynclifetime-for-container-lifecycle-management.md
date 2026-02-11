---
title: "Implement `IAsyncLifetime` for container lifecycle management"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: testcontainers, dotnet, testing, spinning-up-real-databases-in-docker-for-integration-tests, testing-against-postgresqlsql-serverredisrabbitmq-containers, verifying-ef-core-migrations-against-a-real-database
---

## Implement `IAsyncLifetime` for container lifecycle management

Implement `IAsyncLifetime` for container lifecycle management: start containers in `InitializeAsync` and dispose them in `DisposeAsync` to ensure clean setup and teardown for every test class.
