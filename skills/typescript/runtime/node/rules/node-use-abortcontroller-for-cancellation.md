---
title: "Use `AbortController` for cancellation."
impact: MEDIUM
impactDescription: "general best practice"
tags: node, typescript, runtime, nodejs-server-side-development, http-servers-and-apis, file-system-operations
---

## Use `AbortController` for cancellation.

Pass `AbortSignal` to fetch, child processes, streams, and timers to enable clean cancellation.
