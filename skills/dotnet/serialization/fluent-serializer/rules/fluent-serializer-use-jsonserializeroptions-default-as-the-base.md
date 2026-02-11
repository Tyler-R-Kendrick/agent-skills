---
title: "Use `JsonSerializerOptions.Default` as the base"
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-serializer, dotnet, serialization, building-configurable-serialization-pipelines, wrapping-systemtextjson-or-newtonsoftjson-with-fluent-apis, custom-serialization-profiles
---

## Use `JsonSerializerOptions.Default` as the base

Use `JsonSerializerOptions.Default` as the base: start from the framework defaults and override only what you need, rather than building options from scratch.
