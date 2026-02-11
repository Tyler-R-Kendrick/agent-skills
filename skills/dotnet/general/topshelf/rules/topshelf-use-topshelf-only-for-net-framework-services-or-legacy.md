---
title: "Use Topshelf only for .NET Framework services or legacy maintenance"
impact: LOW
impactDescription: "recommended but situational"
tags: topshelf, dotnet, general, creating-windows-services-with-fluent-api, service-installuninstall-from-command-line, service-recovery-configuration
---

## Use Topshelf only for .NET Framework services or legacy maintenance

Use Topshelf only for .NET Framework services or legacy maintenance: for new .NET 6+ services, prefer `BackgroundService` with `AddWindowsService()`.
