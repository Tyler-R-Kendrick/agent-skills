---
title: "Dispose `PhysicalFileProvider` when the application shuts down"
impact: MEDIUM
impactDescription: "general best practice"
tags: file-provider, dotnet, general, abstracting-file-access-over-physical-files, embedded-resources, and-composite-sources
---

## Dispose `PhysicalFileProvider` when the application shuts down

Dispose `PhysicalFileProvider` when the application shuts down: because it holds a `FileSystemWatcher` internally that leaks if not disposed.
