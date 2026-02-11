---
title: "Test every custom rule with at least one positive match and one negative match"
impact: MEDIUM
impactDescription: "general best practice"
tags: semgrep, dotnet, project-system, writing-and-running-pattern-based-static-analysis-rules-for-c-to-detect-security-vulnerabilities, enforce-coding-standards, find-anti-patterns
---

## Test every custom rule with at least one positive match and one negative match

Test every custom rule with at least one positive match and one negative match: by creating test files with `// ruleid: your-rule-id` and `// ok: your-rule-id` annotations and running `semgrep --test`.
