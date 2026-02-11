---
title: "Always check `store"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: isolated-storage, dotnet, data, per-user-or-per-assembly-sandboxed-file-storage-in-desktop-applications, small-settings-or-cache-data-scoped-to-user-identity, and-legacy-clickonce-or-partial-trust-application-scenarios
---

## Always check `store

Always check `store.FileExists` before opening a file for reading to avoid `FileNotFoundException` when the file has never been created.
