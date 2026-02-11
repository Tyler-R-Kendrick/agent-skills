---
title: "Inject `IFileSystem` everywhere instead of using static `File` and `Directory` calls"
impact: MEDIUM
impactDescription: "general best practice"
tags: system-io-abstractions, dotnet, testing, wrapping-file-and-directory-operations-for-testability, mocking-file-system-access-in-unit-tests, replacing-static-filedirectorypath-calls-with-injectable-interfaces
---

## Inject `IFileSystem` everywhere instead of using static `File` and `Directory` calls

Inject `IFileSystem` everywhere instead of using static `File` and `Directory` calls: this single change makes all file-dependent code unit testable without touching the real disk.
