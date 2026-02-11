---
title: "Use `isolatedModules: true`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: project-system, typescript, tsconfigjson-configuration, compiler-options, build-tool-selection
---

## Use `isolatedModules: true`

Use `isolatedModules: true`: when using any transpiler other than `tsc` (esbuild, swc, Babel). It ensures your code is compatible with single-file transpilation.
