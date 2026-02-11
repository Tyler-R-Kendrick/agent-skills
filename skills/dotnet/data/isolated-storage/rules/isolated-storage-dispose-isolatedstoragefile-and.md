---
title: "Dispose `IsolatedStorageFile` and..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: isolated-storage, dotnet, data, per-user-or-per-assembly-sandboxed-file-storage-in-desktop-applications, small-settings-or-cache-data-scoped-to-user-identity, and-legacy-clickonce-or-partial-trust-application-scenarios
---

## Dispose `IsolatedStorageFile` and...

Dispose `IsolatedStorageFile` and `IsolatedStorageFileStream` instances promptly using `using` statements to release file handles and avoid locking issues.
