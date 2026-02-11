---
title: "Use `MappedDiagnosticsLogicalContext` (MDLC)"
impact: MEDIUM
impactDescription: "general best practice"
tags: nlog, dotnet, logging, nlog-target-configuration, layout-renderers, structured-logging-with-nlog
---

## Use `MappedDiagnosticsLogicalContext` (MDLC)

Use `MappedDiagnosticsLogicalContext` (MDLC): for correlation IDs in async workflows instead of the legacy `MappedDiagnosticsContext` (MDC), which is not async-safe.
