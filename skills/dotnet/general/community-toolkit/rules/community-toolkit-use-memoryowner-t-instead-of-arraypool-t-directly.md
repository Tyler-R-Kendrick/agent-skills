---
title: "Use `MemoryOwner<T>` instead of `ArrayPool<T>` directly"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: community-toolkit, dotnet, general, mvvm-source-generated-view-models, observable-properties, relay-commands
---

## Use `MemoryOwner<T>` instead of `ArrayPool<T>` directly

Use `MemoryOwner<T>` instead of `ArrayPool<T>` directly: because it implements `IDisposable` and automatically returns the buffer on dispose, preventing pool exhaustion.
