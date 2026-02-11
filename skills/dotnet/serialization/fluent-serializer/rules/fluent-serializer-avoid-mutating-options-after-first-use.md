---
title: "Avoid mutating options after first use"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fluent-serializer, dotnet, serialization, building-configurable-serialization-pipelines, wrapping-systemtextjson-or-newtonsoftjson-with-fluent-apis, custom-serialization-profiles
---

## Avoid mutating options after first use

`System.Text.Json` locks `JsonSerializerOptions` after first serialization; the fluent builder must complete configuration before the first `Serialize` call.
