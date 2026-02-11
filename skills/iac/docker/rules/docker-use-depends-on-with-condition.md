---
title: "Use `depends_on` with `condition"
impact: MEDIUM
impactDescription: "general best practice"
tags: docker, iac, dockerfiles, docker-compose, multi-stage-builds
---

## Use `depends_on` with `condition

Use `depends_on` with `condition: service_healthy` in Compose for startup ordering.
