---
title: "Configure `archiveAboveSize` and `maxArchiveFiles`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: nlog, dotnet, logging, nlog-target-configuration, layout-renderers, structured-logging-with-nlog
---

## Configure `archiveAboveSize` and `maxArchiveFiles`

Configure `archiveAboveSize` and `maxArchiveFiles`: on file targets to prevent unbounded disk growth; set archive size to 10 MB and retain 10-30 archive files.
