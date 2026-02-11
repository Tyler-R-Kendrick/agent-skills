---
title: "Only expose Swagger UI in development or staging..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: openapi, dotnet, documentation, api-documentation-with-openapiswagger, swashbuckle-configuration, nswag-client-generation
---

## Only expose Swagger UI in development or staging...

Only expose Swagger UI in development or staging environments; disable it in production by guarding with `app.Environment.IsDevelopment()`.
