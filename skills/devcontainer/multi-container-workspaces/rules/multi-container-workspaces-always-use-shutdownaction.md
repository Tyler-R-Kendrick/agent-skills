---
title: "Always use `\"shutdownAction\""
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: multi-container-workspaces, devcontainer, docker-compose-sidecar-services, databasecachequeue-containers-alongside-dev-containers, multi-service-networking
---

## Always use `"shutdownAction"

Always use `"shutdownAction": "stopCompose"` to clean up sidecar containers when the Codespace stops.
