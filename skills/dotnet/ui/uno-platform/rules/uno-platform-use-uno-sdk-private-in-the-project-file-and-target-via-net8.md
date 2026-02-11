---
title: "Use `Uno.Sdk.Private` in the project file and target via `net8.0-*` target frameworks"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: uno-platform, dotnet, ui, building-cross-platform-applications-with-winuixaml-and-c-that-target-web-webassembly, ios, android
---

## Use `Uno.Sdk.Private` in the project file and target via `net8.0-*` target frameworks

(e.g., `net8.0-android`, `net8.0-ios`, `net8.0-browserwasm`) to leverage the single-project structure, which ensures all platform targets build from one `.csproj` and share the same NuGet dependencies.
