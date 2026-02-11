---
title: "Use worker threads for CPU-intensive work."
impact: MEDIUM
impactDescription: "general best practice"
tags: node, typescript, runtime, nodejs-server-side-development, http-servers-and-apis, file-system-operations
---

## Use worker threads for CPU-intensive work.

The main event loop should only handle I/O coordination. Offload heavy computation to worker threads.
