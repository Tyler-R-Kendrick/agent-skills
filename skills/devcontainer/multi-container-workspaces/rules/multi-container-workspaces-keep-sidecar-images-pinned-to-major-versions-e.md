---
title: "Keep sidecar images pinned to major versions (e"
impact: MEDIUM
impactDescription: "general best practice"
tags: multi-container-workspaces, devcontainer, docker-compose-sidecar-services, databasecachequeue-containers-alongside-dev-containers, multi-service-networking
---

## Keep sidecar images pinned to major versions (e

Keep sidecar images pinned to major versions (e.g., `postgres:16`, not `postgres:latest`) for reproducibility.
