---
title: "Use `RunAsLocalSystem()` for services that do not need network access"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: topshelf, dotnet, general, creating-windows-services-with-fluent-api, service-installuninstall-from-command-line, service-recovery-configuration
---

## Use `RunAsLocalSystem()` for services that do not need network access

Use `RunAsLocalSystem()` for services that do not need network access: and `RunAsNetworkService()` for services that need to authenticate on the network.
