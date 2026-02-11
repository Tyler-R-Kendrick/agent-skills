---
title: "Strip sensitive fields (e"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: population-net, dotnet, data, graphql-like-selective-field-projection-in-rest-apis, reducing-over-fetching-by-returning-only-client-requested-fields, dynamic-response-shaping-based-on-query-parameters
---

## Strip sensitive fields (e

Strip sensitive fields (e.g., `passwordHash`, `internalNotes`) from the projectable set regardless of what the client requests, enforcing security at the projection layer.
