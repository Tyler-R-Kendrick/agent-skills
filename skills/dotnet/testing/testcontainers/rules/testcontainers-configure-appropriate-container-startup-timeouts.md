---
title: "Configure appropriate container startup timeouts"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: testcontainers, dotnet, testing, spinning-up-real-databases-in-docker-for-integration-tests, testing-against-postgresqlsql-serverredisrabbitmq-containers, verifying-ef-core-migrations-against-a-real-database
---

## Configure appropriate container startup timeouts

Configure appropriate container startup timeouts: set `WithWaitStrategy(Wait.ForUnixContainer().UntilPortIsAvailable(5432))` to avoid tests failing because the container was not ready.
