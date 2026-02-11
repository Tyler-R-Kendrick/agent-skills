---
title: "Validate that profiles exist at startup"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: fluent-serializer, dotnet, serialization, building-configurable-serialization-pipelines, wrapping-systemtextjson-or-newtonsoftjson-with-fluent-apis, custom-serialization-profiles
---

## Validate that profiles exist at startup

Validate that profiles exist at startup: call `GetOptions(name)` for each expected profile during application startup to fail fast instead of at runtime.
