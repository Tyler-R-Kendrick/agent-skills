---
title: "Prefer JSR (`jsr:`) over URL imports"
impact: LOW
impactDescription: "recommended but situational"
tags: deno, typescript, runtime, deno-runtime-projects, typescript-first-server-side-development, secure-sandboxed-execution
---

## Prefer JSR (`jsr:`) over URL imports

Prefer JSR (`jsr:`) over URL imports: the JSR registry provides versioned, documented packages with TypeScript-first support. Use `deno add` to manage dependencies. ```bash deno add jsr:@std/assert jsr:@oak/oak ```
