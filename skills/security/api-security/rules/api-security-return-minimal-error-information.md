---
title: "Return minimal error information"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: api-security, security, rate-limiting, cors
---

## Return minimal error information

Return minimal error information: never expose stack traces, internal paths, or database error messages in API responses; use generic error messages with correlation IDs for debugging.
