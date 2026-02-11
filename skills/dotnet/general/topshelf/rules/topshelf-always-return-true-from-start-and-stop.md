---
title: "Always return `true` from `Start` and `Stop`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: topshelf, dotnet, general, creating-windows-services-with-fluent-api, service-installuninstall-from-command-line, service-recovery-configuration
---

## Always return `true` from `Start` and `Stop`

Always return `true` from `Start` and `Stop`: unless there is a genuine startup failure that should prevent the service from running.
