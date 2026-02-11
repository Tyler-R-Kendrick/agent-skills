---
title: "Register `FileSystem` as a singleton in production"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: system-io-abstractions, dotnet, testing, wrapping-file-and-directory-operations-for-testability, mocking-file-system-access-in-unit-tests, replacing-static-filedirectorypath-calls-with-injectable-interfaces
---

## Register `FileSystem` as a singleton in production

Register `FileSystem` as a singleton in production: the real `FileSystem` implementation is stateless and thread-safe; there is no need for scoped or transient registration.
