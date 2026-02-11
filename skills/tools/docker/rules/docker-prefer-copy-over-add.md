---
title: "Prefer COPY over ADD"
impact: LOW
impactDescription: "recommended but situational"
tags: docker, tools, podman, dockerfile
---

## Prefer COPY over ADD

`COPY` is explicit and predictable; `ADD` has implicit behaviors (URL fetching, tar extraction) that can surprise you.
