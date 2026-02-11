---
title: "Never disable request validation or model binding validation"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: hygiene, dotnet, security, preventing-xss-attacks, sql-injection-prevention, htmlurljavascript-encoding
---

## Never disable request validation or model binding validation

Never disable request validation or model binding validation: if `ModelState.IsValid` is false, return `ValidationProblem()` immediately; do not proceed with invalid data.
