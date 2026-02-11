---
title: "Add health checks to sidecar services and `depends_on` with..."
impact: MEDIUM
impactDescription: "general best practice"
tags: multi-container-workspaces, devcontainer, docker-compose-sidecar-services, databasecachequeue-containers-alongside-dev-containers, multi-service-networking
---

## Add health checks to sidecar services and `depends_on` with...

Add health checks to sidecar services and `depends_on` with `condition: service_healthy` for the app service.
