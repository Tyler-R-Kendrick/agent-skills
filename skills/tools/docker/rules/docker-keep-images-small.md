---
title: "Keep images small"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: docker, tools, podman, dockerfile
---

## Keep images small

Use alpine/slim bases, clean up package manager caches in the same `RUN` layer, and avoid installing unnecessary packages.
