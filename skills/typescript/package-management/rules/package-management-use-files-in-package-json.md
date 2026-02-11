---
title: "Use `\"files\"` in `package.json`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: package-management, typescript, package-manager-selection, npmyarnpnpmbun-configuration, monorepo-workspaces
---

## Use `"files"` in `package.json`

Use `"files"` in `package.json`: to explicitly whitelist published files. This prevents accidentally shipping source, tests, or credentials.
