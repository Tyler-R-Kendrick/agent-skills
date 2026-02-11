---
title: "Use conditional compilation constants (`__ANDROID__`, `__IOS__`, `HAS_UNO_WASM`, `__SKIA__`) in partial class files"
impact: MEDIUM
impactDescription: "general best practice"
tags: uno-platform, dotnet, ui, building-cross-platform-applications-with-winuixaml-and-c-that-target-web-webassembly, ios, android
---

## Use conditional compilation constants (`__ANDROID__`, `__IOS__`, `HAS_UNO_WASM`, `__SKIA__`) in partial class files

Use conditional compilation constants (`__ANDROID__`, `__IOS__`, `HAS_UNO_WASM`, `__SKIA__`) in partial class files: organized in `Platforms/` subfolders rather than inline `#if` blocks within shared code, keeping platform abstractions isolated and testable.
