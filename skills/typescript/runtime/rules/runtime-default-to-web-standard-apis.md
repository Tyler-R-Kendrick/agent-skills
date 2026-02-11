---
title: "Default to web standard APIs"
impact: MEDIUM
impactDescription: "general best practice"
tags: runtime, typescript, comparing-javascript-runtimes, choosing-between-nodejs-and-deno-and-bun, understanding-runtime-capabilities
---

## Default to web standard APIs

Default to web standard APIs: when writing code that may run on multiple runtimes. Use `fetch`, `Request`, `Response`, `URL`, `crypto.subtle`, and `ReadableStream` instead of runtime-specific equivalents.
