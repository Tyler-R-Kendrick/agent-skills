---
title: "Use `\"exports\"` instead of `\"main\"`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: package-management, typescript, package-manager-selection, npmyarnpnpmbun-configuration, monorepo-workspaces
---

## Use `"exports"` instead of `"main"`

Use `"exports"` instead of `"main"`: for new packages. It provides explicit entry points and prevents deep imports into private modules.
