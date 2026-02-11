---
title: "Use `stream/promises` pipeline"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: node, typescript, runtime, nodejs-server-side-development, http-servers-and-apis, file-system-operations
---

## Use `stream/promises` pipeline

Use `stream/promises` pipeline: for composing streams. Always handle backpressure by using `pipeline()` instead of manual `.pipe()` chains.
