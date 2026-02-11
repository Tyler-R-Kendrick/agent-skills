---
title: "Monitor resolver execution times using Hot Chocolate's built-in instrumentation events"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: graphql, dotnet, web, building-graphql-apis-in-net-using-hot-chocolate-use-when-clients-need-flexible-query-capabilities, field-selection, and-efficient-data-fetching-across-related-entities-without-over-fetching-or-under-fetching
---

## Monitor resolver execution times using Hot Chocolate's built-in instrumentation events

(`IExecutionDiagnosticEvents`) and log queries that exceed a threshold (e.g., 500ms), focusing optimization on the slowest resolvers; avoid premature optimization of resolvers that complete in single-digit milliseconds.
