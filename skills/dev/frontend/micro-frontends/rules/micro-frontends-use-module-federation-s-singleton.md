---
title: "Use Module Federation's `singleton"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: micro-frontends, dev, frontend, micro-frontend-architecture, module-federation, single-spa
---

## Use Module Federation's `singleton

Use Module Federation's `singleton: true` for critical shared dependencies (React, router) to avoid duplicate instances.
