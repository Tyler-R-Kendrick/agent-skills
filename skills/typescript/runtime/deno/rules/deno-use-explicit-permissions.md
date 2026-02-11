---
title: "Use explicit permissions"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: deno, typescript, runtime, deno-runtime-projects, typescript-first-server-side-development, secure-sandboxed-execution
---

## Use explicit permissions

Use explicit permissions: always specify the minimum required permissions instead of using `--allow-all` in production. Use granular paths and hosts. ```bash deno run --allow-net=api.example.com:443 --allow-read=./config --allow-env=DATABASE_URL server.ts ```
