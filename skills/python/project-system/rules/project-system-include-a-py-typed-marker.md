---
title: "Include a `py.typed` marker"
impact: MEDIUM
impactDescription: "general best practice"
tags: python, pyproject, setuptools, hatch, flit, maturin, packaging, pep621, project-system, creating-pyprojecttoml, configuring-build-backends-setuptools, hatchling
---

## Include a `py.typed` marker

Include a `py.typed` marker: for typed packages: ``` src/my_package/py.typed   # Empty file -- signals PEP 561 compliance ```
