---
title: "Add `WithEnumStrings()` for APIs and `WithEnumNumbers()` for storage"
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-serializer, dotnet, serialization, building-configurable-serialization-pipelines, wrapping-systemtextjson-or-newtonsoftjson-with-fluent-apis, custom-serialization-profiles
---

## Add `WithEnumStrings()` for APIs and `WithEnumNumbers()` for storage

Add `WithEnumStrings()` for APIs and `WithEnumNumbers()` for storage: string enums improve API readability while numeric enums are more compact for database or event storage.
