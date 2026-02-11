---
title: "Pin your build backend version"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: python, pyproject, setuptools, hatch, flit, maturin, packaging, pep621, project-system, creating-pyprojecttoml, configuring-build-backends-setuptools, hatchling
---

## Pin your build backend version

Pin your build backend version: in `[build-system].requires` to avoid surprises: ```toml requires = ["hatchling>=1.25,<2"] ```
