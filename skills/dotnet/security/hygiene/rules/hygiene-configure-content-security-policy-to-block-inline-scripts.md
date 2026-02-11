---
title: "Configure Content Security Policy to block inline scripts"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: hygiene, dotnet, security, preventing-xss-attacks, sql-injection-prevention, htmlurljavascript-encoding
---

## Configure Content Security Policy to block inline scripts

Configure Content Security Policy to block inline scripts: use `script-src 'self'` without `'unsafe-inline'` and move all JavaScript to external files to prevent XSS through injected script tags.
