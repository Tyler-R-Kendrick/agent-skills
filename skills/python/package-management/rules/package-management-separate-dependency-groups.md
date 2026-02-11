---
title: "Separate dependency groups"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: python, pip, uv, poetry, pdm, conda, pipx, virtualenv, dependencies, package-management, installing-packages, managing-dependencies, choosing-between-pipuvpoetrypdmconda
---

## Separate dependency groups

Use optional dependency groups (`[project.optional-dependencies]`) or tool-specific groups to keep production dependencies lean: ```toml [project.optional-dependencies] dev = ["pytest", "mypy", "ruff"] docs = ["sphinx"] ```
