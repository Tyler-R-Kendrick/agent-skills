---
title: "Install `System.IO.Abstractions.TestingHelpers` only in test projects"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: system-io-abstractions, dotnet, testing, wrapping-file-and-directory-operations-for-testability, mocking-file-system-access-in-unit-tests, replacing-static-filedirectorypath-calls-with-injectable-interfaces
---

## Install `System.IO.Abstractions.TestingHelpers` only in test projects

Install `System.IO.Abstractions.TestingHelpers` only in test projects: the main `System.IO.Abstractions` package goes in your production projects; the `TestingHelpers` package with `MockFileSystem` should only be referenced by test projects.
