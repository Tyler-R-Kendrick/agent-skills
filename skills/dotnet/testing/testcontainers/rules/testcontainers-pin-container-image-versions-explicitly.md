---
title: "Pin container image versions explicitly"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: testcontainers, dotnet, testing, spinning-up-real-databases-in-docker-for-integration-tests, testing-against-postgresqlsql-serverredisrabbitmq-containers, verifying-ef-core-migrations-against-a-real-database
---

## Pin container image versions explicitly

Pin container image versions explicitly: use `postgres:16-alpine` instead of `postgres:latest` to ensure reproducible builds; unpinned tags can introduce flaky tests when images update.
