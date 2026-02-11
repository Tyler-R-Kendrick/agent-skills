---
title: "Avoid using `PhysicalFileProvider` in unit tests"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: file-provider, dotnet, general, abstracting-file-access-over-physical-files, embedded-resources, and-composite-sources
---

## Avoid using `PhysicalFileProvider` in unit tests

Avoid using `PhysicalFileProvider` in unit tests: create a test implementation of `IFileProvider` or use `NullFileProvider` to keep tests fast and deterministic.
