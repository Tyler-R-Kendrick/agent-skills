---
title: "Test WASM builds early and continuously in CI"
impact: MEDIUM
impactDescription: "general best practice"
tags: uno-platform, dotnet, ui, building-cross-platform-applications-with-winuixaml-and-c-that-target-web-webassembly, ios, android
---

## Test WASM builds early and continuously in CI

Test WASM builds early and continuously in CI: because certain .NET APIs (file system, threading, sockets) are unavailable or restricted in the browser sandbox; discovering API incompatibilities late causes costly rewrites of data-access and background-processing layers.
