---
title: "Return a `400 Bad Request` with a descriptive error message..."
impact: MEDIUM
impactDescription: "general best practice"
tags: population-net, dotnet, data, graphql-like-selective-field-projection-in-rest-apis, reducing-over-fetching-by-returning-only-client-requested-fields, dynamic-response-shaping-based-on-query-parameters
---

## Return a `400 Bad Request` with a descriptive error message...

Return a `400 Bad Request` with a descriptive error message when a client requests a field name that does not exist, rather than silently ignoring unknown fields.
