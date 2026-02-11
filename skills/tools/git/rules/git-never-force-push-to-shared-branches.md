---
title: "Never force push to shared branches."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: git, tools, version-control, branching
---

## Never force push to shared branches.

Force pushing rewrites history and can destroy teammates' work. Use `--force-with-lease` if you must, and only on your own feature branches.
