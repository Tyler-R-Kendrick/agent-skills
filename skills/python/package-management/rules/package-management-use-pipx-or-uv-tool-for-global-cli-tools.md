---
title: "Use pipx or `uv tool` for global CLI tools"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: python, pip, uv, poetry, pdm, conda, pipx, virtualenv, dependencies, package-management, installing-packages, managing-dependencies, choosing-between-pipuvpoetrypdmconda
---

## Use pipx or `uv tool` for global CLI tools

Do not install ruff, black, httpie, etc. into your project virtual environment if they are only needed as standalone tools.
