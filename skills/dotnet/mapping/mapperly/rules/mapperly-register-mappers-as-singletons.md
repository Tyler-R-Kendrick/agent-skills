---
title: "Register mappers as singletons"
impact: MEDIUM
impactDescription: "general best practice"
tags: mapperly, dotnet, mapping, high-performance-object-mapping-via-source-generation, compile-time-mapping-validation, zero-reflection-mapping
---

## Register mappers as singletons

Register mappers as singletons: in the DI container since they are stateless and thread-safe, with no per-request state to manage.
