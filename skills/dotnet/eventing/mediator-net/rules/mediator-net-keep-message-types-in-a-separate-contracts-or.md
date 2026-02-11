---
title: "Keep message types in a separate `Contracts` or..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: mediator-net, dotnet, eventing, source-generated-mediator-pattern, in-process-command-dispatch, query-handling
---

## Keep message types in a separate `Contracts` or...

Keep message types in a separate `Contracts` or `Abstractions` project referencing `Mediator.Abstractions` so consuming assemblies do not need the source generator.
