---
title: "Use parameterized queries everywhere without exception"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: hygiene, dotnet, security, preventing-xss-attacks, sql-injection-prevention, htmlurljavascript-encoding
---

## Use parameterized queries everywhere without exception

Use parameterized queries everywhere without exception: even for queries that appear safe today, always use `@param` syntax to prevent SQL injection if the query evolves to include user input later.
