---
title: "Validate input at the API boundary with allowlists"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: hygiene, dotnet, security, preventing-xss-attacks, sql-injection-prevention, htmlurljavascript-encoding
---

## Validate input at the API boundary with allowlists

Validate input at the API boundary with allowlists: use `[RegularExpression]` and `[StringLength]` data annotations to define what valid input looks like rather than trying to blocklist dangerous characters.
