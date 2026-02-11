---
title: "Quote your variables"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: bash, tools, zsh, shell-scripting
---

## Quote your variables

Always use `"$var"` instead of `$var` to prevent word splitting and globbing issues.
