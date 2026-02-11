---
title: "Run `deno fmt` and `deno lint` in CI"
impact: MEDIUM
impactDescription: "general best practice"
tags: deno, typescript, runtime, deno-runtime-projects, typescript-first-server-side-development, secure-sandboxed-execution
---

## Run `deno fmt` and `deno lint` in CI

Run `deno fmt` and `deno lint` in CI: use the built-in formatter and linter as part of your continuous integration pipeline. ```bash deno fmt --check && deno lint && deno test --allow-read --allow-net ```
