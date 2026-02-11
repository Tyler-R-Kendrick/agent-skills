---
title: "Integrate a DI container"
impact: MEDIUM
impactDescription: "general best practice"
tags: topshelf, dotnet, general, creating-windows-services-with-fluent-api, service-installuninstall-from-command-line, service-recovery-configuration
---

## Integrate a DI container

Integrate a DI container: by building the service provider before `HostFactory.Run` and resolving the service inside `ConstructUsing`.
