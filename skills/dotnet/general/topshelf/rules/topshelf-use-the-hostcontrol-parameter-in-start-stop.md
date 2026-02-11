---
title: "Use the `HostControl` parameter in `Start`/`Stop`"
impact: MEDIUM
impactDescription: "general best practice"
tags: topshelf, dotnet, general, creating-windows-services-with-fluent-api, service-installuninstall-from-command-line, service-recovery-configuration
---

## Use the `HostControl` parameter in `Start`/`Stop`

Use the `HostControl` parameter in `Start`/`Stop`: to request service stop from within the service itself (e.g., `hostControl.Stop()` on unrecoverable error).
