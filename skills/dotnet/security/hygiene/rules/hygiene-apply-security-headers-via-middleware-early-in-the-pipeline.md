---
title: "Apply security headers via middleware early in the pipeline"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: hygiene, dotnet, security, preventing-xss-attacks, sql-injection-prevention, htmlurljavascript-encoding
---

## Apply security headers via middleware early in the pipeline

Apply security headers via middleware early in the pipeline: register `UseSecurityHeaders()` before `UseRouting()` so every response, including error pages, includes protective headers.
