---
title: "Always set and propagate deadlines/timeouts"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: api-design, dev, backend, rest-api-design, graphql-schema-design, grpc-service-definition
---

## Always set and propagate deadlines/timeouts

Always set and propagate deadlines/timeouts. An API call without a timeout is a resource leak waiting to happen.
