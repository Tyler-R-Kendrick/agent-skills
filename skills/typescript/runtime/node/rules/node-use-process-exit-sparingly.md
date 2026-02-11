---
title: "Use `process.exit()` sparingly."
impact: LOW
impactDescription: "recommended but situational"
tags: node, typescript, runtime, nodejs-server-side-development, http-servers-and-apis, file-system-operations
---

## Use `process.exit()` sparingly.

Prefer graceful shutdown by closing servers, database connections, and flushing logs before exiting. Listen for `SIGTERM` and `SIGINT`.
