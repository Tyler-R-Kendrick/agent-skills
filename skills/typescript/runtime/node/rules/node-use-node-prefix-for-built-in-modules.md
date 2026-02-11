---
title: "Use `node:` prefix for built-in modules."
impact: MEDIUM
impactDescription: "general best practice"
tags: node, typescript, runtime, nodejs-server-side-development, http-servers-and-apis, file-system-operations
---

## Use `node:` prefix for built-in modules.

Write `import fs from "node:fs/promises"` instead of `import fs from "fs"` to make it unambiguous that you are importing a built-in.
