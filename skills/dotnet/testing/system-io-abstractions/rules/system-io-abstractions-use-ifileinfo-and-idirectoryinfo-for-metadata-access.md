---
title: "Use `IFileInfo` and `IDirectoryInfo` for metadata access"
impact: MEDIUM
impactDescription: "general best practice"
tags: system-io-abstractions, dotnet, testing, wrapping-file-and-directory-operations-for-testability, mocking-file-system-access-in-unit-tests, replacing-static-filedirectorypath-calls-with-injectable-interfaces
---

## Use `IFileInfo` and `IDirectoryInfo` for metadata access

Use `IFileInfo` and `IDirectoryInfo` for metadata access: when you need creation time, last write time, or file size, use `fileSystem.FileInfo.New(path)` instead of `new FileInfo(path)`.
