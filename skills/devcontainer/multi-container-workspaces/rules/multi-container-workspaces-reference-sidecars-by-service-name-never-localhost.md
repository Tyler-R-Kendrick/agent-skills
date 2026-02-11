---
title: "Reference sidecars by service name, never `localhost`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: multi-container-workspaces, devcontainer, docker-compose-sidecar-services, databasecachequeue-containers-alongside-dev-containers, multi-service-networking
---

## Reference sidecars by service name, never `localhost`

Reference sidecars by service name, never `localhost` — they are separate containers on the Compose network.
