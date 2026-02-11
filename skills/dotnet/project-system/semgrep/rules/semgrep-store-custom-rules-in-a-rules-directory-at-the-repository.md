---
title: "Store custom rules in a `rules/` directory at the repository root and reference them with `--config=./rules/`"
impact: MEDIUM
impactDescription: "general best practice"
tags: semgrep, dotnet, project-system, writing-and-running-pattern-based-static-analysis-rules-for-c-to-detect-security-vulnerabilities, enforce-coding-standards, find-anti-patterns
---

## Store custom rules in a `rules/` directory at the repository root and reference them with `--config=./rules/`

Store custom rules in a `rules/` directory at the repository root and reference them with `--config=./rules/`: to version-control your organization's rules alongside the codebase and share them across repositories.
