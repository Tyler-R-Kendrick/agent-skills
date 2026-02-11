---
title: "Use `CompositeFileProvider` for override patterns"
impact: MEDIUM
impactDescription: "general best practice"
tags: file-provider, dotnet, general, abstracting-file-access-over-physical-files, embedded-resources, and-composite-sources
---

## Use `CompositeFileProvider` for override patterns

Use `CompositeFileProvider` for override patterns: where user-customizable files take priority over embedded defaults, eliminating conditional file-exists logic.
