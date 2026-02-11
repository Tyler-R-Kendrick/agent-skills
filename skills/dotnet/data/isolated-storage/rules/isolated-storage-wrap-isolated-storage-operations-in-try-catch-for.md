---
title: "Wrap isolated storage operations in try-catch for..."
impact: MEDIUM
impactDescription: "general best practice"
tags: isolated-storage, dotnet, data, per-user-or-per-assembly-sandboxed-file-storage-in-desktop-applications, small-settings-or-cache-data-scoped-to-user-identity, and-legacy-clickonce-or-partial-trust-application-scenarios
---

## Wrap isolated storage operations in try-catch for...

Wrap isolated storage operations in try-catch for `IsolatedStorageException` to handle quota exhaustion, concurrent access, and store corruption gracefully.
