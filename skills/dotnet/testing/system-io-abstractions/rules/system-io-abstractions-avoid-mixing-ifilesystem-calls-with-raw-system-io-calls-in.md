---
title: "Avoid mixing `IFileSystem` calls with raw `System.IO` calls in the same class"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: system-io-abstractions, dotnet, testing, wrapping-file-and-directory-operations-for-testability, mocking-file-system-access-in-unit-tests, replacing-static-filedirectorypath-calls-with-injectable-interfaces
---

## Avoid mixing `IFileSystem` calls with raw `System.IO` calls in the same class

Avoid mixing `IFileSystem` calls with raw `System.IO` calls in the same class: if a method uses `IFileSystem.File.ReadAllText`, do not also call `File.Exists` statically, as the mock will not intercept the static call.
