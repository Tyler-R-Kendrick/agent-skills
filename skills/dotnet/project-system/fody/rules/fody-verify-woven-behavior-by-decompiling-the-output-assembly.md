---
title: "Verify woven behavior by decompiling the output assembly with ILSpy or dotnet-ilverify"
impact: MEDIUM
impactDescription: "general best practice"
tags: fody, dotnet, project-system, il-weaving-at-build-time-to-inject-cross-cutting-concerns-such-as-inotifypropertychanged-implementation, null-guard-checks, method-timing
---

## Verify woven behavior by decompiling the output assembly with ILSpy or dotnet-ilverify

Verify woven behavior by decompiling the output assembly with ILSpy or dotnet-ilverify: because IL weaving modifies code after the C# compiler runs and compiler-level debugging cannot step through injected instructions.
