---
title: "Use `AsyncLocalStorage`"
impact: MEDIUM
impactDescription: "general best practice"
tags: node, typescript, runtime, nodejs-server-side-development, http-servers-and-apis, file-system-operations
---

## Use `AsyncLocalStorage`

Use `AsyncLocalStorage`: for request-scoped context (request IDs, user context, tracing spans) instead of passing context through every function argument.
