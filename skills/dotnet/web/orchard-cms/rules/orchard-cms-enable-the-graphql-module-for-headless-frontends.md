---
title: "Enable the GraphQL module for headless frontends"
impact: MEDIUM
impactDescription: "general best practice"
tags: orchard-cms, dotnet, web, building-modular-content-managed-web-applications-with-orchard-core-use-when-you-need-a-multi-tenant-cms-with-content-types, custom-modules, workflows
---

## Enable the GraphQL module for headless frontends

Enable the GraphQL module for headless frontends: and define custom GraphQL query types by implementing `ISchemaBuilder` to expose custom content part fields, rather than building custom REST controllers for every content type, because the GraphQL module auto-generates queries for all registered content types with filtering and pagination.
