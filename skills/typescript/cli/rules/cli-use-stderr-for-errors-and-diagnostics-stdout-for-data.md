---
title: "Use stderr for errors and diagnostics, stdout for data."
impact: MEDIUM
impactDescription: "general best practice"
tags: cli, typescript, cli-tool-development, argument-parsing-with-commanderyargsoclif, terminal-ui-with-ink
---

## Use stderr for errors and diagnostics, stdout for data.

This allows piping output without mixing in error messages: `my-cli list 2>/dev/null | jq .`.
