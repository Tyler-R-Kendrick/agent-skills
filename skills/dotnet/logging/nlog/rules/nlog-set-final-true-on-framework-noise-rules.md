---
title: "Set `final=\"true\"` on framework noise rules"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: nlog, dotnet, logging, nlog-target-configuration, layout-renderers, structured-logging-with-nlog
---

## Set `final="true"` on framework noise rules

(e.g., `<logger name="Microsoft.*" maxlevel="Info" final="true" />`) to prevent framework logs from reaching expensive targets.
