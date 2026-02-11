---
title: "Always use `fetch-depth: 0` in CI checkout steps"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: gitversion, dotnet, project-system, deriving-semantic-version-numbers-from-git-history, branch-names, tags
---

## Always use `fetch-depth: 0` in CI checkout steps

Always use `fetch-depth: 0` in CI checkout steps: because GitVersion needs the full Git history and all tags to calculate versions correctly; shallow clones produce incorrect or zero versions.
