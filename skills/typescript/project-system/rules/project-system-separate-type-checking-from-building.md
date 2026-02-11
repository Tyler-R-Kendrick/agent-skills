---
title: "Separate type-checking from building"
impact: MEDIUM
impactDescription: "general best practice"
tags: project-system, typescript, tsconfigjson-configuration, compiler-options, build-tool-selection
---

## Separate type-checking from building

Separate type-checking from building: use `tsc --noEmit` for type safety and a faster tool (esbuild, swc, Vite) for actual output.
