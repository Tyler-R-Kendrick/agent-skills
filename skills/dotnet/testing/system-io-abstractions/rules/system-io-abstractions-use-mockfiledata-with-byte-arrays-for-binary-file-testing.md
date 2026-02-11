---
title: "Use `MockFileData` with byte arrays for binary file testing"
impact: MEDIUM
impactDescription: "general best practice"
tags: system-io-abstractions, dotnet, testing, wrapping-file-and-directory-operations-for-testability, mocking-file-system-access-in-unit-tests, replacing-static-filedirectorypath-calls-with-injectable-interfaces
---

## Use `MockFileData` with byte arrays for binary file testing

`new MockFileData(new byte[1024])` creates a mock file with specific size for testing size calculations and binary reads.
