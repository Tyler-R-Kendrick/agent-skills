---
title: "Always use a virtual environment"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: python, pip, uv, poetry, pdm, conda, pipx, virtualenv, dependencies, package-management, installing-packages, managing-dependencies, choosing-between-pipuvpoetrypdmconda
---

## Always use a virtual environment

Never install project dependencies into the system Python. Set `require-virtualenv = true` in pip configuration.
