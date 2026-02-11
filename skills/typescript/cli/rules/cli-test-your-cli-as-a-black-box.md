---
title: "Test your CLI as a black box."
impact: MEDIUM
impactDescription: "general best practice"
tags: cli, typescript, cli-tool-development, argument-parsing-with-commanderyargsoclif, terminal-ui-with-ink
---

## Test your CLI as a black box.

Use `execa` or similar to invoke the compiled binary and assert on stdout, stderr, and exit codes.
