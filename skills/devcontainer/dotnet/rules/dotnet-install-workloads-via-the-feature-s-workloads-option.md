---
title: "Install workloads via the feature's `workloads` option..."
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet, devcontainer, net-dev-container-setup, dotnet-sdk-feature, c-dev-kit-extensions
---

## Install workloads via the feature's `workloads` option...

Install workloads via the feature's `workloads` option rather than in `postCreateCommand` so they are cached in prebuilds.
