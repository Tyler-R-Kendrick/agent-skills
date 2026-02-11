---
title: "Reference services by name (`https+http"
impact: MEDIUM
impactDescription: "general best practice"
tags: aspire, dotnet, cloud, orchestrating-multi-service-net-applications, adding-redispostgresqlrabbitmq-with-one-line, built-in-opentelemetry-observability
---

## Reference services by name (`https+http

Reference services by name (`https+http://catalog-api`) in `HttpClient.BaseAddress` and let Aspire's service discovery resolve the actual endpoint, rather than hardcoding `localhost:PORT` URLs.
