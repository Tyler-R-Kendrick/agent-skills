---
title: "Write unit tests for each profile"
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-serializer, dotnet, serialization, building-configurable-serialization-pipelines, wrapping-systemtextjson-or-newtonsoftjson-with-fluent-apis, custom-serialization-profiles
---

## Write unit tests for each profile

Write unit tests for each profile: verify that each named profile produces the expected JSON output (casing, null handling, date format) using snapshot testing or string assertions.
