---
title: "Prefer dedicated DTOs for stable, well-known API shapes and..."
impact: LOW
impactDescription: "recommended but situational"
tags: population-net, dotnet, data, graphql-like-selective-field-projection-in-rest-apis, reducing-over-fetching-by-returning-only-client-requested-fields, dynamic-response-shaping-based-on-query-parameters
---

## Prefer dedicated DTOs for stable, well-known API shapes and...

Prefer dedicated DTOs for stable, well-known API shapes and reserve field projection for APIs with highly diverse consumers who need different subsets of the same resource.
