---
title: "Check `IFileInfo.Exists` before calling `CreateReadStream()`"
impact: MEDIUM
impactDescription: "general best practice"
tags: file-provider, dotnet, general, abstracting-file-access-over-physical-files, embedded-resources, and-composite-sources
---

## Check `IFileInfo.Exists` before calling `CreateReadStream()`

Check `IFileInfo.Exists` before calling `CreateReadStream()`: because non-existent files return a `NotFoundFileInfo` that throws on stream creation.
