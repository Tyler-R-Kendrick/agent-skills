---
title: "Use `EnsureCreatedAsync` or `MigrateAsync` to set up the schema"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: testcontainers, dotnet, testing, spinning-up-real-databases-in-docker-for-integration-tests, testing-against-postgresqlsql-serverredisrabbitmq-containers, verifying-ef-core-migrations-against-a-real-database
---

## Use `EnsureCreatedAsync` or `MigrateAsync` to set up the schema

Use `EnsureCreatedAsync` or `MigrateAsync` to set up the schema: call one of these methods after the container starts to create tables before running test queries.
