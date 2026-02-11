---
title: "Test your packaging"
impact: MEDIUM
impactDescription: "general best practice"
tags: python, pyproject, setuptools, hatch, flit, maturin, packaging, pep621, project-system, creating-pyprojecttoml, configuring-build-backends-setuptools, hatchling
---

## Test your packaging

Test your packaging: before publishing: ```bash python -m build twine check dist/* pip install dist/*.whl ```
