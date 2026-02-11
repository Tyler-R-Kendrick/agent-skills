---
title: "Wrap file and database targets with `AsyncWrapper`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: nlog, dotnet, logging, nlog-target-configuration, layout-renderers, structured-logging-with-nlog
---

## Wrap file and database targets with `AsyncWrapper`

Wrap file and database targets with `AsyncWrapper`: to prevent I/O latency from blocking application threads; NLog's async wrappers batch and flush writes on a background thread.
