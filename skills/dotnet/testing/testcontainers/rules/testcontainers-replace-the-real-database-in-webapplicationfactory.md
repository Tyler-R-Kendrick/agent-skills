---
title: "Replace the real database in `WebApplicationFactory`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: testcontainers, dotnet, testing, spinning-up-real-databases-in-docker-for-integration-tests, testing-against-postgresqlsql-serverredisrabbitmq-containers, verifying-ef-core-migrations-against-a-real-database
---

## Replace the real database in `WebApplicationFactory`

Replace the real database in `WebApplicationFactory`: override `ConfigureWebHost` to swap the production `DbContext` registration with one pointing to the Testcontainers connection string.
