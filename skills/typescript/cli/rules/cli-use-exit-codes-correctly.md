---
title: "Use exit codes correctly."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: cli, typescript, cli-tool-development, argument-parsing-with-commanderyargsoclif, terminal-ui-with-ink
---

## Use exit codes correctly.

Return `0` for success, `1` for general errors, and `2` for usage errors. Never `process.exit(0)` on failure.
