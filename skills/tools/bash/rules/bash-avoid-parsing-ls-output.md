---
title: "Avoid parsing `ls` output"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: bash, tools, zsh, shell-scripting
---

## Avoid parsing `ls` output

Use globs (`for f in *.txt`) or `find` instead of parsing `ls`, which breaks on filenames with spaces or special characters.
