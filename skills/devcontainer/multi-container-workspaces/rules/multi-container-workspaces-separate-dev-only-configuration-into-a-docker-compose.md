---
title: "Separate dev-only configuration into a `docker-compose"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: multi-container-workspaces, devcontainer, docker-compose-sidecar-services, databasecachequeue-containers-alongside-dev-containers, multi-service-networking
---

## Separate dev-only configuration into a `docker-compose

Separate dev-only configuration into a `docker-compose.dev.yml` overlay to keep production Compose files clean.
