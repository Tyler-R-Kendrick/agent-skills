---
title: "Respect `NO_COLOR` environment variable."
impact: MEDIUM
impactDescription: "general best practice"
tags: cli, typescript, cli-tool-development, argument-parsing-with-commanderyargsoclif, terminal-ui-with-ink
---

## Respect `NO_COLOR` environment variable.

Check `process.env.NO_COLOR` and disable colors when set (chalk does this automatically).
