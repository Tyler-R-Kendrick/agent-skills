---
title: "Review diffs before committing."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: git, tools, version-control, branching
---

## Review diffs before committing.

Always run `git diff --staged` before committing to verify you are committing exactly what you intend. Catching stray debug statements or unrelated changes at this stage saves time.
