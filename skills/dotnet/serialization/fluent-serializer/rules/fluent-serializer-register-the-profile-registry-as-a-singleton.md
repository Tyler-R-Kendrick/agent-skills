---
title: "Register the profile registry as a singleton"
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-serializer, dotnet, serialization, building-configurable-serialization-pipelines, wrapping-systemtextjson-or-newtonsoftjson-with-fluent-apis, custom-serialization-profiles
---

## Register the profile registry as a singleton

Register the profile registry as a singleton: serialization profiles are immutable after registration and safe to share across all requests.
