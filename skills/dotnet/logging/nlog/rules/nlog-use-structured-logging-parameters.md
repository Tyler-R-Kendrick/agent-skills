---
title: "Use structured logging parameters"
impact: MEDIUM
impactDescription: "general best practice"
tags: nlog, dotnet, logging, nlog-target-configuration, layout-renderers, structured-logging-with-nlog
---

## Use structured logging parameters

(`{OrderId}`) instead of string concatenation so JSON and database targets can index and query individual properties.
