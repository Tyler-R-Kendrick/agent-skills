---
title: "Pin base image versions with SHA"
impact: MEDIUM
impactDescription: "general best practice"
tags: docker, tools, podman, dockerfile
---

## Pin base image versions with SHA

Use `FROM node:22-alpine@sha256:abc123...` for immutable, reproducible builds that cannot be affected by upstream tag changes.
