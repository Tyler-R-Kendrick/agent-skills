---
title: "Use `PropertyInfo` caching with a `ConcurrentDictionary`..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: population-net, dotnet, data, graphql-like-selective-field-projection-in-rest-apis, reducing-over-fetching-by-returning-only-client-requested-fields, dynamic-response-shaping-based-on-query-parameters
---

## Use `PropertyInfo` caching with a `ConcurrentDictionary`...

Use `PropertyInfo` caching with a `ConcurrentDictionary` keyed by type to avoid repeated reflection lookups on every request in high-throughput scenarios.
