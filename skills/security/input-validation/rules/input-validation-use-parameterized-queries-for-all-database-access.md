---
title: "Use parameterized queries for all database access"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: input-validation, security, output-encoding, xss-prevention
---

## Use parameterized queries for all database access

Use parameterized queries for all database access: never concatenate user input into SQL, regardless of prior validation.
