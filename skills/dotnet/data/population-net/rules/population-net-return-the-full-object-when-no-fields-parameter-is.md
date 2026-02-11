---
title: "Return the full object when no `fields` parameter is..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: population-net, dotnet, data, graphql-like-selective-field-projection-in-rest-apis, reducing-over-fetching-by-returning-only-client-requested-fields, dynamic-response-shaping-based-on-query-parameters
---

## Return the full object when no `fields` parameter is...

Return the full object when no `fields` parameter is provided so that the API remains fully functional for clients that do not use field selection.
