---
title: "Register GraphQL services using `AddGraphQLServer()` and call `MapGraphQL()` at a dedicated path"
impact: MEDIUM
impactDescription: "general best practice"
tags: graphql, dotnet, web, building-graphql-apis-in-net-using-hot-chocolate-use-when-clients-need-flexible-query-capabilities, field-selection, and-efficient-data-fetching-across-related-entities-without-over-fetching-or-under-fetching
---

## Register GraphQL services using `AddGraphQLServer()` and call `MapGraphQL()` at a dedicated path

(default `/graphql`) rather than embedding GraphQL resolution inside REST controllers, keeping the two API styles isolated and independently configurable.
