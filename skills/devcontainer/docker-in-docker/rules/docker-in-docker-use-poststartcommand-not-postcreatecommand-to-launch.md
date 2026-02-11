---
title: "Use `postStartCommand` (not `postCreateCommand`) to launch..."
impact: MEDIUM
impactDescription: "general best practice"
tags: docker-in-docker, devcontainer, running-docker-inside-dev-containers, dind-feature-configuration, building-images-in-codespaces
---

## Use `postStartCommand` (not `postCreateCommand`) to launch...

Use `postStartCommand` (not `postCreateCommand`) to launch containers so they restart on every Codespace resume.
