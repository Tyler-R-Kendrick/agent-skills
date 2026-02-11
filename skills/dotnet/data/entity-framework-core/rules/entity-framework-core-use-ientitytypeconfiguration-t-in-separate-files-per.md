---
title: "Use `IEntityTypeConfiguration<T>` in separate files per..."
impact: MEDIUM
impactDescription: "general best practice"
tags: entity-framework-core, dotnet, data, crud-data-access-with-linq, database-migrations, change-tracking
---

## Use `IEntityTypeConfiguration<T>` in separate files per...

Use `IEntityTypeConfiguration<T>` in separate files per entity instead of a single large `OnModelCreating` method, keeping model configuration modular and testable.
