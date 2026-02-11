---
title: "Create named profiles for distinct serialization contexts"
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-serializer, dotnet, serialization, building-configurable-serialization-pipelines, wrapping-systemtextjson-or-newtonsoftjson-with-fluent-apis, custom-serialization-profiles
---

## Create named profiles for distinct serialization contexts

Create named profiles for distinct serialization contexts: use separate profiles for API responses, event payloads, and file storage rather than a single global `JsonSerializerOptions`.
