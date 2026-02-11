---
title: "Cache projected responses with a cache key that includes..."
impact: MEDIUM
impactDescription: "general best practice"
tags: population-net, dotnet, data, graphql-like-selective-field-projection-in-rest-apis, reducing-over-fetching-by-returning-only-client-requested-fields, dynamic-response-shaping-based-on-query-parameters
---

## Cache projected responses with a cache key that includes...

Cache projected responses with a cache key that includes the `fields` parameter value so that different field combinations are cached independently.
