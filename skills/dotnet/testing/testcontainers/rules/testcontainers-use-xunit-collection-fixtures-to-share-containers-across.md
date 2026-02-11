---
title: "Use xUnit collection fixtures to share containers across test classes"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: testcontainers, dotnet, testing, spinning-up-real-databases-in-docker-for-integration-tests, testing-against-postgresqlsql-serverredisrabbitmq-containers, verifying-ef-core-migrations-against-a-real-database
---

## Use xUnit collection fixtures to share containers across test classes

Use xUnit collection fixtures to share containers across test classes: avoid the overhead of starting a new container for each test class by defining `ICollectionFixture<T>` with a shared container.
