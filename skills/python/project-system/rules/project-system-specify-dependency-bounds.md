---
title: "Specify dependency bounds"
impact: MEDIUM
impactDescription: "general best practice"
tags: python, pyproject, setuptools, hatch, flit, maturin, packaging, pep621, project-system, creating-pyprojecttoml, configuring-build-backends-setuptools, hatchling
---

## Specify dependency bounds

Use minimum versions with `>=` and optional upper bounds: ```toml dependencies = [ "httpx>=0.27", "pydantic>=2.0,<3", ] ```
