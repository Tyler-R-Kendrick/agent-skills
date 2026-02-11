---
title: "Use `metavariable-regex` to narrow matches by type name or method name patterns"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: semgrep, dotnet, project-system, writing-and-running-pattern-based-static-analysis-rules-for-c-to-detect-security-vulnerabilities, enforce-coding-standards, find-anti-patterns
---

## Use `metavariable-regex` to narrow matches by type name or method name patterns

Use `metavariable-regex` to narrow matches by type name or method name patterns: when full type resolution is not available; this prevents false positives on similarly-named but unrelated APIs.
