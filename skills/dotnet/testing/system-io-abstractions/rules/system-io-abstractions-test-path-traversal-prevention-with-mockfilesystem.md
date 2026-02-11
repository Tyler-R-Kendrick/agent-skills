---
title: "Test path traversal prevention with `MockFileSystem`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: system-io-abstractions, dotnet, testing, wrapping-file-and-directory-operations-for-testability, mocking-file-system-access-in-unit-tests, replacing-static-filedirectorypath-calls-with-injectable-interfaces
---

## Test path traversal prevention with `MockFileSystem`

Test path traversal prevention with `MockFileSystem`: verify that `GetFullPath` combined with a `StartsWith` check on the base directory prevents `../` attacks in your path resolution logic.
