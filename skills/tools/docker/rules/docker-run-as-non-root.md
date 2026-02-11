---
title: "Run as non-root"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: docker, tools, podman, dockerfile
---

## Run as non-root

Always add a `USER` instruction to run the container process as a non-root user for defense in depth.
