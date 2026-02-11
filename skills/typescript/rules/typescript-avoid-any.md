---
title: "Avoid `any`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: typescript, typescript-language-features, choosing-build-tools, package-managers
---

## Avoid `any`

Avoid `any`: it disables all type checking. Use `unknown` when the type is truly unknown, then narrow with type guards.
