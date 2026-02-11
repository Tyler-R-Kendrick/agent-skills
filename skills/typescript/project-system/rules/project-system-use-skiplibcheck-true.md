---
title: "Use `skipLibCheck: true`"
impact: MEDIUM
impactDescription: "general best practice"
tags: project-system, typescript, tsconfigjson-configuration, compiler-options, build-tool-selection
---

## Use `skipLibCheck: true`

Use `skipLibCheck: true`: to speed up compilation by not type-checking `node_modules/.d.ts` files. This is safe for most projects.
