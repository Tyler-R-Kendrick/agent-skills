---
title: "Use `IFileSystem.Path` instead of `System.IO.Path` directly"
impact: MEDIUM
impactDescription: "general best practice"
tags: system-io-abstractions, dotnet, testing, wrapping-file-and-directory-operations-for-testability, mocking-file-system-access-in-unit-tests, replacing-static-filedirectorypath-calls-with-injectable-interfaces
---

## Use `IFileSystem.Path` instead of `System.IO.Path` directly

Use `IFileSystem.Path` instead of `System.IO.Path` directly: while `Path` methods are mostly static math, wrapping them through `IFileSystem.Path` maintains consistency and supports cross-platform test scenarios.
