---
title: "Use the `@` destructuring operator"
impact: MEDIUM
impactDescription: "general best practice"
tags: serilog, dotnet, logging, serilog-sink-configuration, structured-event-logging, log-enrichment
---

## Use the `@` destructuring operator

Use the `@` destructuring operator: for complex objects (`{@Order}`) to capture their full structure, and the `$` stringify operator for enums and types where only the string representation matters.
