---
title: "Test real database behavior, not ORM abstractions"
impact: MEDIUM
impactDescription: "general best practice"
tags: testcontainers, dotnet, testing, spinning-up-real-databases-in-docker-for-integration-tests, testing-against-postgresqlsql-serverredisrabbitmq-containers, verifying-ef-core-migrations-against-a-real-database
---

## Test real database behavior, not ORM abstractions

Test real database behavior, not ORM abstractions: use Testcontainers to test raw SQL queries, stored procedures, database constraints, and migration scripts that cannot be verified with in-memory providers.
