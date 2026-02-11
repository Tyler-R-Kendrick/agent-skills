---
title: "Return `this` from every configuration method"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fluent-serializer, dotnet, serialization, building-configurable-serialization-pipelines, wrapping-systemtextjson-or-newtonsoftjson-with-fluent-apis, custom-serialization-profiles
---

## Return `this` from every configuration method

Return `this` from every configuration method: every fluent method must return the builder instance to enable method chaining; break the chain only with terminal methods like `Serialize` or `Build`.
