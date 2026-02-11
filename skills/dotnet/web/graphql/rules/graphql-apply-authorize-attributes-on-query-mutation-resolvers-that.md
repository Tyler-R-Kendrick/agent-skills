---
title: "Apply `[Authorize]` attributes on query/mutation resolvers that require authentication"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: graphql, dotnet, web, building-graphql-apis-in-net-using-hot-chocolate-use-when-clients-need-flexible-query-capabilities, field-selection, and-efficient-data-fetching-across-related-entities-without-over-fetching-or-under-fetching
---

## Apply `[Authorize]` attributes on query/mutation resolvers that require authentication

Apply `[Authorize]` attributes on query/mutation resolvers that require authentication: and use `[GraphQLAuthorize(Policy = "AdminOnly")]` for role-based access control, rather than checking `ClaimsPrincipal` manually in every resolver method.
