---
title: "Use lightweight Alpine-based images where available"
impact: MEDIUM
impactDescription: "general best practice"
tags: testcontainers, dotnet, testing, spinning-up-real-databases-in-docker-for-integration-tests, testing-against-postgresqlsql-serverredisrabbitmq-containers, verifying-ef-core-migrations-against-a-real-database
---

## Use lightweight Alpine-based images where available

`postgres:16-alpine` pulls faster and uses less disk space than the full `postgres:16` image, improving CI pipeline speed.
