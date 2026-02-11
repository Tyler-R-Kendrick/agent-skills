---
title: "Use glob patterns in `Watch()`"
impact: MEDIUM
impactDescription: "general best practice"
tags: file-provider, dotnet, general, abstracting-file-access-over-physical-files, embedded-resources, and-composite-sources
---

## Use glob patterns in `Watch()`

Use glob patterns in `Watch()`: like `**/*.json` for recursive watching or `config/*.yaml` for directory-scoped watching instead of watching individual files one at a time.
