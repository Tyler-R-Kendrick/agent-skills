---
title: "Make `Build()` return a copy of the options"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: fluent-serializer, dotnet, serialization, building-configurable-serialization-pipelines, wrapping-systemtextjson-or-newtonsoftjson-with-fluent-apis, custom-serialization-profiles
---

## Make `Build()` return a copy of the options

Make `Build()` return a copy of the options: return `new JsonSerializerOptions(options)` to prevent callers from mutating the shared configuration after building.
