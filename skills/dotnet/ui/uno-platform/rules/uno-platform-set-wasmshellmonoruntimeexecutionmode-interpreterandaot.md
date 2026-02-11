---
title: "Set `<WasmShellMonoRuntimeExecutionMode>InterpreterAndAOT</WasmShellMonoRuntimeExecutionMode>` for WASM release builds"
impact: MEDIUM
impactDescription: "general best practice"
tags: uno-platform, dotnet, ui, building-cross-platform-applications-with-winuixaml-and-c-that-target-web-webassembly, ios, android
---

## Set `<WasmShellMonoRuntimeExecutionMode>InterpreterAndAOT</WasmShellMonoRuntimeExecutionMode>` for WASM release builds

Set `<WasmShellMonoRuntimeExecutionMode>InterpreterAndAOT</WasmShellMonoRuntimeExecutionMode>` for WASM release builds: to enable AOT compilation of hot paths; pure interpreter mode is 5-10x slower than AOT on compute-intensive operations like list filtering and JSON deserialization.
