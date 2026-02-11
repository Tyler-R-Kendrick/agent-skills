---
title: "Write to stderr for diagnostics"
impact: MEDIUM
impactDescription: "general best practice"
tags: python, cli, argparse, click, typer, rich, textual, tui, building-cli-tools-with-argparseclicktyper, rich-terminal-output, tui-applications-with-textual
---

## Write to stderr for diagnostics

Use `stderr` for progress, warnings, and errors. Reserve `stdout` for data output: ```python import sys print("data output")              # stdout -- pipeable print("Warning: ...", file=sys.stderr)  # stderr -- visible but not piped ```
