---
title: "Pre-populate `MockFileSystem` with test data in the constructor"
impact: MEDIUM
impactDescription: "general best practice"
tags: system-io-abstractions, dotnet, testing, wrapping-file-and-directory-operations-for-testability, mocking-file-system-access-in-unit-tests, replacing-static-filedirectorypath-calls-with-injectable-interfaces
---

## Pre-populate `MockFileSystem` with test data in the constructor

Pre-populate `MockFileSystem` with test data in the constructor: pass a `Dictionary<string, MockFileData>` to set up the initial file system state rather than creating files in test Arrange steps.
