---
title: "Separate log rules by severity"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: nlog, dotnet, logging, nlog-target-configuration, layout-renderers, structured-logging-with-nlog
---

## Separate log rules by severity

Separate log rules by severity: so that `Error` and `Critical` logs reach alerting targets (email, PagerDuty) while `Debug` logs go only to file, reducing alert noise.
