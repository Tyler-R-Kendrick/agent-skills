---
title: "Always handle `unhandledRejection`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: node, typescript, runtime, nodejs-server-side-development, http-servers-and-apis, file-system-operations
---

## Always handle `unhandledRejection`

Always handle `unhandledRejection`: and `uncaughtException`. Log the error, flush metrics, and exit the process. Do not attempt to continue running after `uncaughtException`.
