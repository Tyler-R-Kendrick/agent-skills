---
title: "Use `pattern-not` and `pattern-not-inside` to reduce false positives"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: semgrep, dotnet, project-system, writing-and-running-pattern-based-static-analysis-rules-for-c-to-detect-security-vulnerabilities, enforce-coding-standards, find-anti-patterns
---

## Use `pattern-not` and `pattern-not-inside` to reduce false positives

Use `pattern-not` and `pattern-not-inside` to reduce false positives: by explicitly excluding safe patterns (e.g., excluding parameterized queries from SQL injection rules, excluding event handlers from async-void rules).
