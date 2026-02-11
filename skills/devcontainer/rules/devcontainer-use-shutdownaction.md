---
title: "Use `\"shutdownAction\""
impact: MEDIUM
impactDescription: "general best practice"
tags: devcontainer, devcontainerjson-configuration, github-codespaces-setup, lifecycle-hooks
---

## Use `"shutdownAction"

Use `"shutdownAction": "stopCompose"` with Docker Compose setups to clean up sidecar containers.
