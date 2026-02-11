---
title: "Use `IsolatedStorageFile"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: isolated-storage, dotnet, data, per-user-or-per-assembly-sandboxed-file-storage-in-desktop-applications, small-settings-or-cache-data-scoped-to-user-identity, and-legacy-clickonce-or-partial-trust-application-scenarios
---

## Use `IsolatedStorageFile

Use `IsolatedStorageFile.GetUserStoreForAssembly()` as the default scope; use `GetMachineStoreForAssembly()` only when data must be shared across all users on the machine.
