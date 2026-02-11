---
title: "Inject `IFileProvider` through DI"
impact: MEDIUM
impactDescription: "general best practice"
tags: file-provider, dotnet, general, abstracting-file-access-over-physical-files, embedded-resources, and-composite-sources
---

## Inject `IFileProvider` through DI

Inject `IFileProvider` through DI: rather than creating providers inline so the file source can be swapped for testing with `NullFileProvider` or an in-memory implementation.
