---
title: "Test both file-exists and file-missing scenarios"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: system-io-abstractions, dotnet, testing, wrapping-file-and-directory-operations-for-testability, mocking-file-system-access-in-unit-tests, replacing-static-filedirectorypath-calls-with-injectable-interfaces
---

## Test both file-exists and file-missing scenarios

Test both file-exists and file-missing scenarios: always verify behavior when expected files are absent, directories do not exist, or paths are invalid.
