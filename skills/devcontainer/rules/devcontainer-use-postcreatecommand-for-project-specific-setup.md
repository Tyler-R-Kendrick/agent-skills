---
title: "Use `postCreateCommand` for project-specific setup..."
impact: MEDIUM
impactDescription: "general best practice"
tags: devcontainer, devcontainerjson-configuration, github-codespaces-setup, lifecycle-hooks
---

## Use `postCreateCommand` for project-specific setup...

Use `postCreateCommand` for project-specific setup (dependency install, migrations) and `postStartCommand` for starting dev servers.
