---
title: "Clean up data between tests when sharing containers"
impact: MEDIUM
impactDescription: "general best practice"
tags: testcontainers, dotnet, testing, spinning-up-real-databases-in-docker-for-integration-tests, testing-against-postgresqlsql-serverredisrabbitmq-containers, verifying-ef-core-migrations-against-a-real-database
---

## Clean up data between tests when sharing containers

Clean up data between tests when sharing containers: use `DELETE FROM` or `TRUNCATE` in a `[BeforeEach]` hook to reset data state rather than spinning up a new container per test.
