---
title: "Do not store sensitive data like passwords or tokens in..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: isolated-storage, dotnet, data, per-user-or-per-assembly-sandboxed-file-storage-in-desktop-applications, small-settings-or-cache-data-scoped-to-user-identity, and-legacy-clickonce-or-partial-trust-application-scenarios
---

## Do not store sensitive data like passwords or tokens in...

Do not store sensitive data like passwords or tokens in isolated storage without encryption, because the files are readable by any process running under the same user account.
