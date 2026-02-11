---
title: "List weavers in `FodyWeavers.xml` in the order they should execute"
impact: MEDIUM
impactDescription: "general best practice"
tags: fody, dotnet, project-system, il-weaving-at-build-time-to-inject-cross-cutting-concerns-such-as-inotifypropertychanged-implementation, null-guard-checks, method-timing
---

## List weavers in `FodyWeavers.xml` in the order they should execute

List weavers in `FodyWeavers.xml` in the order they should execute: because Fody processes add-ins sequentially and the output of one weaver becomes the input of the next; place `NullGuard` before `MethodTimer` so that timing includes the null-check overhead.
