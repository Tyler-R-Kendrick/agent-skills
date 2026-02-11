---
title: "Define input types for mutations (`CreateProductInput`) and return payload types (`CreateProductPayload`) with optional `UserError` fields"
impact: MEDIUM
impactDescription: "general best practice"
tags: graphql, dotnet, web, building-graphql-apis-in-net-using-hot-chocolate-use-when-clients-need-flexible-query-capabilities, field-selection, and-efficient-data-fetching-across-related-entities-without-over-fetching-or-under-fetching
---

## Define input types for mutations (`CreateProductInput`) and return payload types (`CreateProductPayload`) with optional `UserError` fields

Define input types for mutations (`CreateProductInput`) and return payload types (`CreateProductPayload`) with optional `UserError` fields: rather than throwing exceptions, following the GraphQL convention where errors are part of the response payload, not transport-level failures.
