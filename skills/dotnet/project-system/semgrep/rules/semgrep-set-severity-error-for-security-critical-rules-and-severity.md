---
title: "Set `severity: ERROR` for security-critical rules and `severity: WARNING` for style/best-practice rules"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: semgrep, dotnet, project-system, writing-and-running-pattern-based-static-analysis-rules-for-c-to-detect-security-vulnerabilities, enforce-coding-standards, find-anti-patterns
---

## Set `severity: ERROR` for security-critical rules and `severity: WARNING` for style/best-practice rules

Set `severity: ERROR` for security-critical rules and `severity: WARNING` for style/best-practice rules: so that CI pipelines can use `--error` to fail on security findings while allowing warnings to pass.
