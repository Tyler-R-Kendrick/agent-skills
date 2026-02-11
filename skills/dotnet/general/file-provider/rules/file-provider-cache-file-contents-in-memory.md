---
title: "Cache file contents in memory"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: file-provider, dotnet, general, abstracting-file-access-over-physical-files, embedded-resources, and-composite-sources
---

## Cache file contents in memory

Cache file contents in memory: for frequently accessed templates rather than reading from the provider on every request, using `IChangeToken` to invalidate the cache.
