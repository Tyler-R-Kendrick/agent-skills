---
title: "Use `using` declarations for resource management"
impact: MEDIUM
impactDescription: "general best practice"
tags: deno, typescript, runtime, deno-runtime-projects, typescript-first-server-side-development, secure-sandboxed-execution
---

## Use `using` declarations for resource management

Deno supports the TC39 Explicit Resource Management proposal for automatic cleanup. ```typescript using file = await Deno.open("./data.txt"); // file is automatically closed when scope exits ```
